import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Onboarding4 = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.navigate("Onboarding3")}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="chevron-back-outline"
                stroke={3}
                size={28}
                color="white"
              />
              <Text style={[styles.buttonText, { fontWeight: "bold" }]}>
                Back
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("BottomTabs")}
          >
            <Text style={[styles.buttonText, { fontWeight: "bold" }]}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <Text style={[styles.title, { color: "white" }]}>
            Journals for Reflection
          </Text>
          <Image
            source={require("../assets/image3.png")}
            style={styles.image}
          />
          <Text style={[styles.description, { color: "white" }]}>
            Reflect on your journey, document your progress, and gain insights
            into your thoughts and emotions.
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("BottomTabs")}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Start Meditating</Text>
        </TouchableOpacity>
        <Image source={require("../assets/dots4.png")} style={styles.dots} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A0060",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  skipButton: {
    justifyContent: "flex-start",
    fontWeight: "bold",
  },
  backButton: {
    justifyContent: "flex-end",
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    textAlign: "center",
    marginBottom: 40,
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  dots: {
    width: 70,
    height: 11.5,
    alignSelf: "center",
  },
  buttonContainer: {
    backgroundColor: "#7000E0",
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: "20%",
    alignItems: "center",
    marginTop: 100,
    marginBottom: 30,
    alignSelf: "center",
  },
});

export default Onboarding4;
