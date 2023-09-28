import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";

const emotions = [
  "Stressed",
  "Anxious",
  "Tired",
  "Confident",
  "Conflicted",
  "Overwhelmed",
  "Relaxed",
  "Inspired",
  "Restless",
  "Hopeful",
];

function GuidedMeditationScreen({ navigation }) {
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [inputStyle, setInputStyle] = useState(styles.textInput);

  return (
    <View style={{ ...styles.page, backgroundColor: "#2A0060" }}>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: 500,
          marginBottom: 14,
          textAlign: "center",
        }}
      >
        How are you feeling today,{"\n"}Sebastian?
      </Text>
      <TextInput
        placeholder="Custom..."
        style={inputStyle}
        value={selectedEmotion}
        onChangeText={(text) => {
          setSelectedEmotion(text);
          setInputStyle(styles.textInput);
        }}
      />

      <View style={styles.emotionContainer}>
        {emotions.map((emotion, index) => (
          <TouchableOpacity
            key={index}
            style={styles.emotionOption}
            onPress={() => {
              setInputStyle(styles.textInput);
              setSelectedEmotion(emotion);
            }}
          >
            <Text style={{ color: "white" }}>{emotion}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => {
          if (selectedEmotion === "") {
            setInputStyle({
              ...styles.textInput,
              borderColor: "red",
              borderWidth: 3,
            });
          } else {
            navigation.navigate("GuidedMeditationOptional", {
              emotion: selectedEmotion,
            });
          }
        }}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  textInput: {
    width: "75%",
    borderRadius: 12,
    backgroundColor: "white",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
  },
  emotionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    borderColor: "white",
    border: "1.5px solid white",
    color: "white",
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: "#7000E0",
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: "30%",
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  emotionOption: {
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "white",
    color: "white",
    marginBottom: 16,
    width: "48%",
  },
});

export default GuidedMeditationScreen;
