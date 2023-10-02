import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

function GuidedMeditationOptionalScreen({ route, navigation }) {
  const techniques = [
    "Relaxation",
    "Anxiety Relief",
    "Self Compassion",
    "Self Reflection",
    "Gratitude",
    "Loving-Kindness",
    "Mental Clarity",
    "Empowerment",
    "Visualization",
    "Mindful Walking",
  ];
  const { emotion } = route.params;
  const [technique, setTechnique] = useState("");
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
        Which meditation technique{"\n"}would you like to try?
      </Text>
      <TextInput
        placeholder="Please select one (Optional)"
        style={inputStyle}
        value={technique}
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
          console.log(emotion, technique);
          navigation.navigate("Duration", {
            emotion: emotion,
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