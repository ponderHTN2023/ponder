import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { StateContext } from "../context/state";

const Onboarding = ({ navigation }) => {
  const [user, setUser] = useContext(StateContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Skip Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("BottomTabs")}
          style={styles.skipButton}
        >
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>

        {/* Content */}
        <View style={styles.contentContainer}>
          <Image source={require("../assets/icon.png")} style={styles.logo} />
          <Text style={[styles.title, { color: "white" }]}>
            Welcome to Ponder
          </Text>
          <Text style={[styles.description, { color: "white" }]}>
            An AI-powered meditation app designed to be your trusted companion
            on your path to inner peace and self-discovery.
          </Text>
          {/* <Text style={[styles.description, { color: 'white' }]}>
            In a world where daily stresses often pull us away from our true selves, Ponder is here to guide you back to a place of serenity and balance.
          </Text> */}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Onboarding2")}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

        {/* Dots */}
        <Image source={require("../assets/dots.png")} style={styles.dots} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A0060",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  dots: {
    width: 70,
    height: 11.5,
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
  skipButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default Onboarding;
