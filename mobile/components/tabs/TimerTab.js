import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

const TimerTab = ({ route, navigation }) => {
  const minutes = Array.from({ length: 60 }, (_, i) => i + 1).concat(
    Array("unlimited")
  );
  const [selectedDuration, setSelectedDuration] = useState(1);

  const handleNextPress = () => {
    navigation.navigate("MeditationTimer", {
      duration: selectedDuration,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: "white" }]}>Meditation Timer</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedDuration}
          onValueChange={(itemValue) => setSelectedDuration(itemValue)}
          style={styles.pickerStyle}
          mode="dropdown"
          itemStyle={styles.pickerItem}
        >
          {minutes.map((min) => (
            <Picker.Item
              key={min}
              style={{ width: 200 }}
              label={String(min)}
              value={min}
            />
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
    width: 150,
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

export default TimerTab;
