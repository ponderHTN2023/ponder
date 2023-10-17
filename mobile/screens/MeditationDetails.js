import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MeditationDetails = ({ route, navigation }) => {
  const { key } = route.params;
  const data = require("../assets/meditations.json");
  const description = data[key]["description"];
  const guide = data[key]["guide"];
  const benefits = data[key]["benefits"];
  const title = data[key]["title"];

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={{ position: "absolute", top: 60, left: 20 }}
          onPress={() => navigation.navigate("Explore")}
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
        <Text style={styles.title}>{title}</Text>
        <Text>{description}</Text>
        <Text>{guide}</Text>
        <Text>{benefits}</Text>
      </ScrollView>
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
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    marginTop: 100,
  },
});

export default MeditationDetails;
