import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { Circle, Svg } from "react-native-svg";
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";
import { Asset } from "expo-asset";
import { StateContext } from "../context/state";
import { createMeditation, saveMeditation } from "../api/meditation";
import Loading from "../components/Loading";
import { track } from "@amplitude/analytics-react-native";

const GuidedMeditationTimer = ({ route, navigation }) => {
  const [duration, setDuration] = useState(route.params?.duration * 300 || 300);
  const { emotion, technique, sessionUri } = route.params;
  const [user, setUser] = useContext(StateContext);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState(duration);
  const [sound, setSound] = useState();
  const [meditation, setMeditation] = useState();
  const [meditationUri, setMeditationUri] = useState();

  const generateMeditation = async () => {
    let response = { uri: "" };
    try {
      response = await createMeditation({
        duration: duration,
        emotion: emotion,
        technique: technique,
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return response["uri"];
    } catch (error) {
      console.error("Error generating meditation:", error.message);
      Alert.alert(
        "Oops! Meditation Hiccup",
        "Our meditation generator is taking a brief mindfulness break. Please give it a moment of peace and try again. 🧘‍♂️✨",
        [{ text: "Try Again", onPress: () => navigation.navigate("Home") }]
      );
    }
  };

  useEffect(() => {
    const setupAudio = async () => {
      try {
        let uri = sessionUri;
        setLoading(true);
        if (!uri) {
          uri = await generateMeditation();
        }
        console.log("uri:", uri);
        setMeditationUri(uri);
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        });

        const soundInstance = new Audio.Sound();
        await soundInstance.loadAsync({
          uri: uri,
        });
        console.log("soundInstance:", soundInstance);
        soundInstance
          .getStatusAsync()
          .then((res) => {
            console.log("res:", res.durationMillis);
            const seconds = Math.floor(res.durationMillis / 1000);
            setDuration(seconds);
            setRemainingTime(seconds);
          })
          .catch((err) => {
            console.log("err:", err);
          });
        console.log("soundInstance:", soundInstance);
        setLoading(false);
        setSound(soundInstance);
        setMeditation(uri);
      } catch (error) {
        console.error("Error setting up audio:", error);
      }
    };
    if (!sound && !loading) {
      setupAudio();
    }
  }, []);

  const handlePress = async () => {
    if (isActive) {
      sound && (await sound.pauseAsync());
      setIsPlaying(false);
    } else {
      sound && (await sound.playAsync());
      setIsPlaying(true);
    }
    setIsActive(!isActive);
  };

  const loadAudio = async (uri) => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
    });

    const soundInstance = new Audio.Sound();
    await soundInstance.loadAsync({
      uri: uri,
    });
    soundInstance
      .getStatusAsync()
      .then((res) => {
        console.log("res:", res.durationMillis);
        const seconds = Math.floor(res.durationMillis / 1000);
        setDuration(seconds);
        setRemainingTime(seconds);
      })
      .catch((err) => {
        console.log("err:", err);
      });
    console.log("soundInstance:", soundInstance);
    setLoading(false);
    setSound(soundInstance);
  };

  const finishMeditation = async () => {
    setIsActive(false);
    setProgress(0);
    setRemainingTime(duration);
    setIsPlaying(false);
    // test out below for bell after meditation is complete (need to also reload meditation after bell is done playing)
    // const soundInstance = new Audio.Sound();
    // console.log("here in finishMeditation ");
    // await soundInstance.loadAsync(
    //   Asset.fromModule(require("../assets/meditation-bell.mp3"))
    // );
    // console.log("soundInstance:", soundInstance);
    // setSound(soundInstance);
    // soundInstance && (await soundInstance.playAsync());
    await loadAudio(meditation);
  };

  useEffect(() => {
    let interval;
    if (isActive && remainingTime > 0) {
      interval = setInterval(() => {
        setProgress((duration - remainingTime + 1) / duration);
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      if (remainingTime === 0) {
        console.log("here");
        trackMeditation();
        finishMeditation();
      }
    }

    return () => clearInterval(interval);
  }, [isActive, remainingTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const trackMeditation = () => {
    if (duration - remainingTime > 0) {
      const activity = {
        emotion: emotion,
        technique: technique,
        uri: meditationUri,
        duration: duration - remainingTime,
        total_duration: duration,
        name: "Guided",
      };
      setUser({
        ...user,
        minMeditated:
          user.minMeditated + Math.floor((duration - remainingTime) / 60),
        numMeditations: user.numMeditations + 1,
        avgDuration: Math.floor(
          (user.avgDuration * user.numMeditations +
            (duration - remainingTime)) /
            (user.numMeditations + 1)
        ),
        sessions: [
          {
            ...activity,
            id: user.sessions.length ? user.sessions[0].id + 1 : 1,
            created_at: new Date().toISOString(),
          },
          ...user.sessions,
        ],
      });
      console.log("activity:", activity);
      saveMeditation(user.id, activity);
    }
  };

  const exit = async () => {
    if (sessionUri) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
      console.log(duration - remainingTime);
    }
    track("Meditation", {
      duration: duration - remainingTime,
      totalDuration: duration,
      emotion: emotion,
      technique: technique,
      type: "Guided",
    });
    trackMeditation();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <TouchableOpacity
          style={styles.crossButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.crossButtonText}>✕</Text>
        </TouchableOpacity>
        <Loading
          text={"Crafting meditation...\nThis could take a few minutes."}
        />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.crossButton} onPress={exit}>
        <Text style={styles.crossButtonText}>✕</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 24 }}>
        <Svg width="200" height="200" viewBox="0 0 200 200">
          <Circle
            cx="100"
            cy="100"
            r="95"
            stroke="#C9B0FF"
            strokeWidth="10"
            fill="#7000E0"
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
            strokeDasharray={`${progress * Math.PI * 2 * 95} 600`}
          />
        </Svg>
        <View style={styles.button}>
          <TouchableOpacity onPress={handlePress}>
            <Image
              source={
                isPlaying
                  ? require("../assets/pause.png")
                  : require("../assets/play.png")
              }
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.countdown}>{formatTime(remainingTime)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2A0060",
  },
  loadingContainer: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    backgroundColor: "#2A0060",
    justifyContent: "center",
  },
  button: {
    position: "relative",
    top: -115,
    left: 88,
    zIndex: 100,
  },
  countdown: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    color: "white",
  },
  crossButton: {
    position: "absolute",
    top: 70,
    left: 27,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 1000,
    backgroundColor: "rgba(112, 0, 224, 0.45)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  crossButtonText: {
    fontSize: 18,
    fontWeight: "800",
    color: "black",
  },
});

export default GuidedMeditationTimer;
