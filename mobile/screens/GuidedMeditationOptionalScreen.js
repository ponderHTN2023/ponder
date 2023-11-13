import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

function GuidedMeditationOptionalScreen({ route, navigation }) {
  const techniques = [
    "Breath Awareness",
    "Anxiety Relief",
    "Self Reflection",
    "Gratitude",
    "Loving-Kindness",
    "Kriya meditation",
    "Transcendental",
    "Visualization",
    "Vipassana",
    "Mindful Walking",
  ];
  const [technique, setTechnique] = useState("");
  const [inputStyle, setInputStyle] = useState(styles.textInput);

  return (
    <View style={{ ...styles.page, backgroundColor: "#2A0060" }}>
      <TouchableOpacity
        style={{ position: "absolute", top: 60, left: 20 }}
        onPress={() => navigation.navigate("GuidedMeditation")}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="chevron-back-outline"
            stroke={3}
            size={28}
            color="white"
          />
          <Text style={[styles.buttonText, { fontWeight: "bold" }]}>Back</Text>
        </View>
      </TouchableOpacity>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: 500,
          marginBottom: 14,
          textAlign: "center",
        }}
      >
        Which meditation type{"\n"}would you like to try?
      </Text>
      <TextInput
        placeholder="Please select one (Optional)"
        style={inputStyle}
        value={technique}
        placeholderTextColor="#B9B9B9"
        onChangeText={(text) => {
          setTechnique(text);
          setInputStyle(styles.textInput);
        }}
      />

      <View style={styles.emotionContainer}>
        {techniques.map((technique, index) => (
          <TouchableOpacity
            key={index}
            style={styles.emotionOption}
            onPress={() => {
              setInputStyle(styles.textInput);
              setTechnique(technique);
            }}
          >
            <Text style={{ color: "white" }}>{technique}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Duration", {
            technique: technique,
          });
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

export default GuidedMeditationOptionalScreen;
