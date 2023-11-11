import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

function MeditationOptions({ route, navigation }) {
  return (
    <View style={{ ...styles.page, backgroundColor: "#2A0060" }}>
      <TouchableOpacity
        style={{ position: "absolute", top: 60, left: 20 }}
        onPress={() => navigation.goBack()}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="chevron-back-outline"
            stroke={3}
            size={28}
            color="white"
          />
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>
            Back
          </Text>
        </View>
      </TouchableOpacity>
      <View>
        <Text style={styles.title}>Choose Your Meditation Path</Text>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("GuidedMeditation")}
        >
          <Image
            source={require("../assets/mood.png")}
            style={{ marginRight: 24, width: 48, height: 48 }}
          />
          <View>
            <Text style={styles.buttonTitle}>Meditate by Mood</Text>
            <Text style={styles.buttonSubtitle}>
              Personalized for your current state of mind.
            </Text>
          </View>
          <Image
            source={require("../assets/star.png")}
            style={{
              position: "absolute",
              right: 8,
              top: 8,
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 42,
          }}
        >
          <View
            style={{
              height: 1,
              width: "20%",
              backgroundColor: "white",
              marginRight: 16,
            }}
          />
          <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
            OR
          </Text>
          <View
            style={{
              height: 1,
              width: "20%",
              backgroundColor: "white",
              marginLeft: 16,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("GuidedMeditationOptional")}
          style={styles.buttonContainer}
        >
          <Image
            source={require("../assets/guru.png")}
            style={{ marginRight: 24, width: 48, height: 48 }}
          />
          <View>
            <Text style={styles.buttonTitle}>Meditate by Technique</Text>
            <Text style={styles.buttonSubtitle}>
              Select from various meditation techniques
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: "20%",
    textAlign: "center",
  },
  buttonSubtitle: {
    fontSize: 14,
    color: "white",
    flexWrap: "wrap",
    width: 216,
  },
  buttonContainer: {
    backgroundColor: "#7000E0",
    borderRadius: 14,
    borderColor: "#B353FF",
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 42,
  },
  buttonTitle: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: "bold",
    color: "white",
  },
});

export default MeditationOptions;
