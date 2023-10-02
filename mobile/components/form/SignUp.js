import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { createUser } from "../../api/user";
import { useSignUp, useAuth, useUser } from "@clerk/clerk-react";

export default function SignUpForm({ navigation }) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [nameErr, setSetNameErr] = useState(false);
  const [code, setCode] = useState("");
  const { signOut, sessionId, getToken } = useAuth();

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const token = await getToken();

      await signUp.create({
        emailAddress,
        password,
      });

      console.log("session_id:", signUp.createdSessionId);
      const res = await createUser({ name, email: emailAddress });

      console.log("setting active session:", signUp.createdSessionId);
      await setActive({ session: signUp.createdSessionId });

      console.log("new user id:", res.data["id"]);
      console.log("status:", signUp.status);

      // await signUp.update({
      //   unsafeMetadata: { userId: res.data["id"] },
      // });

      navigation.navigate("Onboarding");

      // await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      // setPendingVerification(true);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const validateForm = () => {
    setEmailErr(false);
    setPasswordErr(false);
    setSetNameErr(false);
    if (name === "") {
      setSetNameErr(true);
      alert("Name is required.");
    } else if (emailAddress === "") {
      alert("Email Address is required");
      setEmailErr(true);
    } else if (!emailAddress.includes("@")) {
      alert("Email Address must be valid");
      setEmailErr(true);
    } else if (password === "") {
      alert("Password is required");
      setPasswordErr(true);
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters");
      setPasswordErr(true);
    } else {
      onSignUpPress(emailAddress, password);
    }
  };

  // Not doing for now, but this is how you would verify email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      const res = await createUser({ name, emailAddress });
      completeSignUp.user.update({ publicMetadata: { userId: res.data.id } });

      navigation.navigate("Onboarding");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      {pendingVerification ? (
        <>
          <TextInput
            placeholder="Code"
            style={styles.textInput}
            value={code}
            onChangeText={(text) => {
              setCode(text);
            }}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={onPressVerify}
          >
            <Text style={styles.buttonText}>Verify Email</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            placeholder="Name"
            style={nameErr ? styles.textInputError : styles.textInput}
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />
          <TextInput
            placeholder="Email Address"
            autoCapitalize="none"
            style={emailErr ? styles.textInputError : styles.textInput}
            value={emailAddress}
            onChangeText={(text) => {
              setEmailAddress(text);
            }}
          />
          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            style={passwordErr ? styles.textInputError : styles.textInput}
            clearButtonMode="always"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={validateForm}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
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