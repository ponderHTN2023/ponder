import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

const Duration = ({ route, navigation }) => {
  const [selectedDuration, setSelectedDuration] = useState(1);
  const { emotion, technique } = route.params;
  console.log("emotion:", emotion);

  const handleNextPress = () => {
    navigation.navigate("MeditationTimer", {
      duration: selectedDuration,
      emotion,
      technique,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ position: "absolute", top: 60, left: 20 }}
        onPress={() =>
          navigation.navigate("GuidedMeditationOptional", {
            emotion,
            technique,
          })
        }
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="chevron-back-outline"
            stroke={3}
            size={28}
            color="white"
          />
          <Text style={[styles.buttonText, { fontWeight: "bold" }]}>Back</Text>
        </View>
      </TouchableOpacity>
      <Text style={[styles.title, { color: "white" }]}>Session Duration</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedDuration}
          onValueChange={(itemValue) => setSelectedDuration(itemValue)}
          style={styles.pickerStyle}
          mode="dropdown"
          itemStyle={styles.pickerItem}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((min) => (
            <Picker.Item key={min} label={String(min)} value={min} />
          ))}
        </Picker>
        <Text style={styles.minText}>min</Text>
      </View>
      <TouchableOpacity
        onPress={handleNextPress}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Begin Session</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2A0060",
  },
  pickerContainer: {
    flexDirection: "row", // Arrange the Picker and Text horizontally
    alignItems: "center", // Align items vertically in the center
    marginBottom: 40,
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
  buttonContainer: {
    backgroundColor: "#7000E0",
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: "20%",
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    // marginBottom: 10,
  },
});

export default Duration;
