import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const Onboarding2 = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.navigate("Onboarding")}
          >
            <Text style={[styles.buttonText, { fontWeight: "bold" }]}>
              ⇐ Back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <Text style={[styles.buttonText, { fontWeight: "bold" }]}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <Text style={[styles.title, { color: "white" }]}>
            Personalized Guided Meditations
          </Text>
          <Image
            source={require("../assets/image1.png")}
            style={styles.image}
          />
          <Text style={[styles.description, { color: "white" }]}>
            Ponder crafts each meditation session specifically for you.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Onboarding3")}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

        <Image source={require("../assets/dots2.png")} style={styles.dots} />
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
  },
  backButton: {
    justifyContent: "flex-end",
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
    marginBottom: 30,
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
    width: 190,
    height: 150,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
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
    paddingHorizontal: "30%",
    alignItems: "center",
    marginBottom: 30,
    alignSelf: "center",
  },
});

export default Onboarding2;
