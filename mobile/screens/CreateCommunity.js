import React, { useState, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { createCommunity } from "../api/community";
import { StateContext } from "../context/state";

const CreateCommunity = ({ navigation }) => {
  const [user, setUser] = useContext(StateContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameStyle, setNameStyle] = useState(styles.nameInput);
  const [descriptionStyle, setDescriptionStyle] = useState(
    styles.descriptionInput
  );

  const submitForm = async () => {
    if (name === "" || description === "") {
      setNameStyle(
        name === ""
          ? { ...styles.nameInput, borderColor: "red", borderWidth: 3 }
          : styles.nameInput
      );
      setDescriptionStyle(
        description === ""
          ? { ...styles.descriptionInput, borderColor: "red", borderWidth: 3 }
          : styles.descriptionInput
      );
      return;
    }
    await createCommunity({ user_id: user.id, name, description });
    navigation.goBack();
  };

  return (
    <View style={styles.page}>
      <TouchableOpacity
        style={styles.crossButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.crossButtonText}>✕</Text>
      </TouchableOpacity>
      <Text style={styles.title}>New Community</Text>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Community Name</Text>
        <TextInput
          style={nameStyle}
          value={name}
          onChangeText={(text) => {
            setName(text);
            setNameStyle(styles.nameInput);
          }}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Community Description</Text>
        <TextInput
          style={descriptionStyle}
          value={description}
          numberOfLines={3}
          placeholder="What's the purpose of this group?"
          multiline
          onChangeText={(text) => {
            setDescription(text);
            setDescriptionStyle(styles.descriptionInput);
          }}
        />
      </View>
      <TouchableOpacity onPress={submitForm} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Create Community</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateCommunity;

const styles = StyleSheet.create({
  page: {
    height: "100%",
    // justifyContent: "center",
    backgroundColor: "#2A0060",
    alignItems: "center",
    padding: 24,
  },
  nameInput: {
    width: 300,
    borderRadius: 12,
    backgroundColor: "white",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 36,
  },
  descriptionInput: {
    width: 300,
    borderRadius: 12,
    backgroundColor: "white",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingTop: 10,
    height: 80,
    textAlignVertical: "top",
  },
  crossButton: {
    position: "absolute",
    top: 40,
    left: 27,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 1000,
    backgroundColor: "rgba(112, 0, 224, 0.45)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  crossButtonText: {
    fontSize: 18,
    fontWeight: "800",
    color: "black",
  },
  buttonContainer: {
    backgroundColor: "#7000E0",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 36,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  label: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 60,
    marginTop: 96,
  },
});
