import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { saveMeditation } from "../api/meditation";
import { StateContext } from "../context/state";

const ManualMeditation = ({ route, navigation }) => {
  const [user, setUser] = useContext(StateContext);
  const [duration, setDuration] = useState(1);
  const [technique, setTechnique] = useState("");
  const [description, setDescription] = useState("");

  const save = async () => {
    const meditation = {
      duration: duration * 60,
      name: "Manual",
      technique: technique,
      description: description,
    };
    console.log("meditation:", meditation);
    const res = await saveMeditation(user.id, meditation);
    console.log("res:", res);
    setUser({
      ...user,
      numMeditations: user.numMeditations + 1,
      minMeditated: user.minMeditated + duration,
      avgDuration: Math.floor(
        (user.avgDuration * user.numMeditations + duration) /
          (user.numMeditations + 1)
      ),
      sessions: [
        {
          ...meditation,
          id: user.sessions.length ? user.sessions[0].id + 1 : 1,
          created_at: new Date().toISOString(),
        },
        ...user.sessions,
      ],
    });
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.crossButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.crossButtonText}>✕</Text>
      </TouchableOpacity>
      <View style={{ paddingHorizontal: 24, marginTop: 60 }}>
        <Text style={styles.title}>Session Duration</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={duration}
            onValueChange={(itemValue) => setDuration(itemValue)}
            style={styles.pickerStyle}
            mode="dropdown"
            itemStyle={styles.pickerItem}
          >
            {Array.from({ length: 60 }, (_, i) => i + 1).map((min) => (
              <Picker.Item key={min} label={String(min)} value={min} />
            ))}
          </Picker>
          <Text style={styles.minText}>min</Text>
        </View>
        <View>
          <Text style={styles.title}>Meditation Technique</Text>
          <TextInput
            placeholder="Any specific type of meditation?"
            style={styles.textInput}
            placeholderTextColor="#B9B9B9"
            value={technique}
            onChangeText={(text) => {
              setTechnique(text);
            }}
          />
        </View>
        <View>
          <Text style={styles.title}>Meditation Notes</Text>
          <TextInput
            placeholder="How did it go?"
            numberOfLines={2}
            placeholderTextColor="#B9B9B9"
            style={[
              styles.textInput,
              {
                paddingTop: 10,
                height: 80,
                textAlignVertical: "top",
              },
            ]}
            multiline={true}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
        </View>
        <TouchableOpacity onPress={save} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Save Meditation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#2A0060",
  },
  pickerContainer: {
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    marginBottom: 24,
  },
  textInput: {
    borderRadius: 12,
    backgroundColor: "white",
    padding: 10,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 32,
    marginTop: 16,
  },
  pickerStyle: {
    height: 200,
    width: 100,
  },
  minText: {
    fontSize: 16,
    color: "#FFFFFF",
    paddingTop: 15,
  },
  pickerItem: {
    color: "#FFFFFF",
    backgroundColor: "#2A0060",
  },
  crossButton: {
    position: "absolute",
    top: 30,
    left: 24,
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
    paddingVertical: 20,
    paddingHorizontal: "20%",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    color: "white",
    // marginBottom: 10,
  },
});

export default ManualMeditation;
