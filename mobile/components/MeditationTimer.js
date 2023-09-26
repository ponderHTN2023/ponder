import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Circle, Svg } from "react-native-svg";
import { Audio } from "expo-av";
import { Asset } from "expo-asset";
import { createMeditation } from "../api/meditation";

const MeditationTimer = ({ route, navigation }) => {
  const DURATION = route.params?.duration * 60 || 60;
  const emotion = route.params?.selectedEmotion || "Happy";
  const goal = route.params?.goal || "I want to be happy";
  const [loading, setLoading] = useState(false);

  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState(DURATION);
  const [sound, setSound] = useState();

  const generateMeditation = async () => {
    setLoading(true);
    const response = await createMeditation({
      duration: DURATION,
      emotion: emotion,
      goal: goal,
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    return response;
  };

  useEffect(() => {
    const setupAudio = async () => {
      try {
        await generateMeditation();
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
        });

        const soundInstance = new Audio.Sound();
        const soundAsset = Asset.fromModule(
          require("../assets/meditation.mp3")
        );
        await soundInstance.loadAsync(soundAsset);
        setSound(soundInstance);
      } catch (error) {
        console.error("Error setting up audio:", error);
      }
    };
    if (!sound) {
      setupAudio();
    }
  }, []);

  async function playSound() {
    try {
      await sound.replayAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }

  const handlePress = async () => {
    if (isActive) {
      sound && (await sound.pauseAsync());
    } else {
      sound && (await sound.playAsync());
    }
    setIsActive(!isActive);
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
        setIsActive(false);
        setProgress(0);
        setRemainingTime(DURATION);
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
      <View style={styles.container}>
        <Text style={styles.countdown}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.crossButton}
        onPress={async () => {
          if (sound) {
            await sound.stopAsync();
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
          stroke="blue"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
          strokeDasharray={`${progress * Math.PI * 2 * 95} 600`}
        />
      </Svg>
      <Text style={styles.countdown}>{formatTime(remainingTime)}</Text>
      <Button
        title={isActive ? "Pause" : "Start"}
        onPress={handlePress}
        style={styles.button}
      />
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
  button: {
    marginTop: 10,
    position: "absolute",
    bottom: 50,
    zIndex: 1,
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
    padding: 10,
    borderRadius: 100,
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
    fontWeight: "bold",
    color: "black",
  },
});

export default MeditationTimer;
