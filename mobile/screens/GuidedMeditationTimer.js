import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { Circle, Svg } from "react-native-svg";
import { Audio } from "expo-av";
import { Asset } from "expo-asset";
import { createMeditation } from "../api/meditation";
import Loading from "../components/Loading";

const GuidedMeditationTimer = ({ route, navigation }) => {
  const DURATION = route.params?.duration * 60 || 60;
  const emotion = route.params?.emotion;
  const technique = route.params?.technique;
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState(DURATION);
  const [sound, setSound] = useState();
  const [meditation, setMeditation] = useState();

  const generateMeditation = async () => {
    setLoading(true);
    const response = await createMeditation({
      duration: DURATION,
      emotion: emotion,
      technique: technique,
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    return response["uri"];
  };

  useEffect(() => {
    const setupAudio = async () => {
      try {
        const uri = await generateMeditation();
        console.log("uri:", uri);
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
        });

        const soundInstance = new Audio.Sound();
        await soundInstance.loadAsync({
          uri: uri,
        });
        console.log("soundInstance:", soundInstance);
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

  const loadAudio = async (uri) => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
    });

    const soundInstance = new Audio.Sound();
    console.log("uri in loadasync:", uri);
    await soundInstance.loadAsync({ uri: uri });
    console.log("soundInstance:", soundInstance);
    setSound(soundInstance);
    setMeditation(uri);
  };

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

  const finishMeditation = async () => {
    setIsActive(false);
    setProgress(0);
    setRemainingTime(DURATION);
    setIsPlaying(false);
    // test out below for bell after meditation is complete (need to also reload meditation after bell is done playing)
    // const soundInstance = new Audio.Sound();
    // console.log("here in finishMeditation ");
    // await soundInstance.loadAsync(
    //   Asset.fromModule(require("../assets/meditation-bell.mp3"))
    // );
    // console.log("soundInstance:", soundInstance);
    // setSound(soundInstance);
    // playSound();
    // sound && (await sound.playAsync());
    // await loadAudio(meditation);
  };

  useEffect(() => {
    let interval;
    if (isActive && remainingTime > 0) {
      interval = setInterval(() => {
        setProgress((DURATION - remainingTime + 1) / DURATION);
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      if (remainingTime === 0) {
        console.log("here");
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
          text={"Crafting meditation...\nThis could take up to a minute."}
        />
      </SafeAreaView>
    );
  }

  console.log("sound:", sound);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.crossButton}
        onPress={async () => {
          if (sound) {
            await sound.stopAsync();
            setIsPlaying(false);
          }
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.crossButtonText}>✕</Text>
      </TouchableOpacity>
      <Svg width="200" height="200" style={styles.timer} viewBox="0 0 200 200">
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
  timer: {
    position: "absolute",
  },
  loadingContainer: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    backgroundColor: "#2A0060",
    justifyContent: "center",
  },
  button: {
    // marginTop: 10,
    position: "absolute",
    top: 410,
    left: 185,
    zIndex: 100,
  },
  countdown: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 350,
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
