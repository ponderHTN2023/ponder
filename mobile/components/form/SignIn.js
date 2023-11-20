import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { useSignIn } from "@clerk/clerk-react";

export default function SignInForm({ navigation }) {
  const [emailAddress, setEmailAddress] = React.useState("");
  const { isLoaded, signIn, setActive } = useSignIn();
  const [password, setPassword] = React.useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const validateForm = () => {
    setEmailErr(false);
    setPasswordErr(false);
    const title = "Oops! 🧘‍♂️";
    if (emailAddress === "") {
      Alert.alert(title, "Email Address is required.");
      setEmailErr(true);
    } else if (!emailAddress.includes("@")) {
      Alert.alert(title, "Please enter a valid email address.");
      setEmailErr(true);
    } else if (password === "") {
      Alert.alert(title, "Password is required.");
      setPasswordErr(true);
    } else if (password.length < 8) {
      Alert.alert(title, "Password must be at least 8 characters.");
      setPasswordErr(true);
    } else {
      onSignInPress();
    }
  };

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
      navigation.navigate("BottomTabs");
    } catch (err) {
      console.log(err);
      setEmailErr(true);
      setPasswordErr(true);
      Alert.alert(
        "Oops! 🧘‍♂️",
        err.errors && err.errors.length > 0
          ? err.errors[0].message
          : "Your email address or password is incorrect. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email Address"
        placeholderTextColor="#B9B9B9"
        inputMode="email"
        style={emailErr ? styles.textInputError : styles.textInput}
        value={emailAddress}
        onChangeText={(text) => {
          setEmailAddress(text);
        }}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="Password"
        placeholderTextColor="#B9B9B9"
        style={passwordErr ? styles.textInputError : styles.textInput}
        clearButtonMode="always"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={validateForm}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderRadius: 12,
    backgroundColor: "white",
    paddingHorizontal: 17,
    paddingVertical: 8,
    width: 293,
    height: 40,
    borderColor: "#B9B9B9",
    borderWidth: 2,
    marginBottom: 24,
  },
  textInputError: {
    borderRadius: 12,
    backgroundColor: "white",
    paddingHorizontal: 17,
    paddingVertical: 8,
    width: 293,
    height: 40,
    borderColor: "red",
    borderWidth: 2,
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 20,
    width: 242,
    paddingVertical: 16,
    backgroundColor: "#7000E0",
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
  },
});
