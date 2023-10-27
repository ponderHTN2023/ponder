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
} from "react-native";
import { Circle, Svg } from "react-native-svg";
import { Audio } from "expo-av";
import { Asset } from "expo-asset";
import { saveMeditation } from "../api/meditation";
import { StateContext } from "../context/state";
import Loading from "../components/Loading";

const MeditationTimer = ({ route, navigation }) => {
  const DURATION =
    route.params?.duration === "unlimited"
      ? "unlimited"
      : route.params?.duration * 60 || 60;
  const [user, setUser] = useContext(StateContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [sound, setSound] = useState();

  useEffect(() => {
    const setupAudio = async () => {
      try {
        console.log("here");
        await loadAudio();
      } catch (error) {
        console.error("Error setting up audio:", error);
      }
    };
    if (!sound) {
      setupAudio();
    }
  }, []);

  const loadAudio = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
    });

    const soundInstance = new Audio.Sound();
    await soundInstance.loadAsync(
      Asset.fromModule(require("../assets/meditation-bell.mp3"))
    );
    console.log("soundInstance:", soundInstance);
    setSound(soundInstance);
  };

  const handlePress = async () => {
    setIsActive(!isActive);
    setIsPlaying(!isPlaying);
  };

  const playSound = async () => {
    console.log("sound:", sound);
    sound && (await sound.playAsync());
    await loadAudio();
  };

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setProgress((0 + timeSpent + 1) / DURATION);
        setTimeSpent(timeSpent + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      console.log(timeSpent, DURATION);
    }
    if (timeSpent === DURATION) {
      setIsActive(false);
      trackMeditation();
      setProgress(0);
      setTimeSpent(0);
      setIsPlaying(false);
      playSound();
    }

    return () => clearInterval(interval);
  }, [isActive, timeSpent]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const trackMeditation = async () => {
    if (timeSpent > 0) {
      const activity = {
        duration: timeSpent,
        name: "guided",
      };
      console.log("activity:", activity);
      saveMeditation(user.id, activity);
    }
  };

  const exit = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
      trackMeditation;
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.crossButton} onPress={exit}>
        <Text style={styles.crossButtonText}>✕</Text>
      </TouchableOpacity>
      <Svg width="200" height="200" style={styles.timer} viewBox="0 0 200 200">
        <Circle
          cx="100"
          cy="100"
          r="95"
          stroke="#C9B0FF"
          strokeWidth={DURATION === "unlimited" ? "0" : "10"}
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

      <Text style={styles.time}>{formatTime(timeSpent)}</Text>
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
  timer: {
    position: "absolute",
    top: 275,
  },
  button: {
    // marginTop: 10,
    position: "absolute",
    top: 360,
    left: 186,
    zIndex: 100,
  },
  time: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 340,
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
  buttonContainer: {
    backgroundColor: "#7000E0",
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: "20%",
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default MeditationTimer;
