import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import SignUpForm from "../components/form/SignUp";
import SignInForm from "../components/form/SignIn";

const Auth = ({ navigation }) => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={require("../assets/icon.png")} style={styles.logo} />
        <Text style={[styles.title, { color: "white" }]}>
          {isSignUp ? "Create Account" : "Welcome back!"}
        </Text>
      </View>
      {isSignUp ? (
        <SignUpForm navigation={navigation} />
      ) : (
        <SignInForm navigation={navigation} />
      )}
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => setIsSignUp(!isSignUp)}
      >
        <Text style={styles.buttonText}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
        </Text>
        <Text style={styles.subText}>{isSignUp ? "Log in" : "Sign up"}</Text>
      </TouchableOpacity>
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
    fontSize: 26,
    fontWeight: "600",
    color: "white",
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
    marginTop: 30,
    paddingVertical: 16,
    backgroundColor: "#7000E0",
    borderRadius: 14,
    paddingHorizontal: 88,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 16,
    paddingBottom: 0,
    fontWeight: "300",
    color: "white",
  },
  subText: {
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 0,
    color: "white",
    textDecorationLine: "underline",
  },
  skipButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default Auth;
