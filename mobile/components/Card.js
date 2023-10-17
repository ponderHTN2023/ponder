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
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{ ...styles.cardButton, backgroundColor: buttonColor }}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 17,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 14,
    color: "white",
  },
  cardDescription: {
    fontSize: 16,
    marginBottom: 24,
    color: "white",
    textAlign: "left",
  },
  cardButton: {
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
