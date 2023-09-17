import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MeditationTimer from "./components/MeditationTimer";
import Onboarding from "./components/Onboarding";
import Onboarding2 from "./components/Onboarding2";
import Onboarding3 from "./components/Onboarding3";
import Onboarding4 from "./components/Onboarding4";
import HomeScreen from "./components/HomeScreen";
import PonderQuestionPage from "./components/PonderQuestionPage";
import Duration from "./components/Duration";
import GuidedMeditationOptionalScreen from "./components/GuidedMeditationOptionalScreen";

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
            // make border of input red
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

function WeeklyChallenges() {
  return (
    <View style={styles.page}>
      <Text>Weekly Challenges Screen</Text>
    </View>
  );
}

function ChallengesScreen() {
  return (
    <View style={styles.page}>
      <Text>Challenges Screen</Text>
    </View>
  );
}

function BookScreen() {
  return (
    <View style={styles.page}>
      <Text>Book Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding2"
          component={Onboarding2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding3"
          component={Onboarding3}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding4"
          component={Onboarding4}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Challenges"
          component={ChallengesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GuidedMeditation"
          component={GuidedMeditationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GuidedMeditationOptional"
          component={GuidedMeditationOptionalScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PonderQuestion"
          component={PonderQuestionPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Duration"
          component={Duration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MeditationTimer"
          component={MeditationTimer}
          options={{ headerShown: false, title: "Meditation Timer" }}
        />
        <Stack.Screen
          name="WeeklyChallenges" // Modified this line
          component={WeeklyChallenges}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Book"
          component={BookScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
    marginBottom: 10,
    width: "48%",
  },
});
