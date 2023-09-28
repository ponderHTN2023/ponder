import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Card({
  title,
  description,
  buttonText,
  onPress,
  color,
  buttonColor,
}) {
  return (
    <View style={{ ...styles.card, backgroundColor: color }}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
      <TouchableOpacity
        style={{ ...styles.cardButton, backgroundColor: buttonColor }}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
    color: "white",
  },
  cardDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: "white",
    textAlign: "center",
  },
  cardButton: {
    backgroundColor: "#3498db",
    padding: 10,
    alignItems: "center",
    width: 217,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 18,
    textAlign: "left",
  },
});
