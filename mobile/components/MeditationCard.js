import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function MeditationCard({
  title,
  description,
  buttonText,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...styles.meditationCard, borderWidth: 1 }}>
        <Image
          source={require("../assets/mindfulness.jpeg")}
          style={styles.meditationCardImage}
        />
        <Text style={styles.meditationCardTitle}>{title}</Text>
        {/* <View borderStyle="solid" style={{ flexDirection: "row" }}>
          <Text style={{ ...styles.cardTitle }}>{title}</Text>
        </View>
        <View
          style={{
            marginTop: 5,
            width: "100%",
            borderTopWidth: 1,
            borderTopColor: "white",
          }}
        >
          <Text style={styles.cardDescription}>{description}</Text>
        </View> */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  meditationCard: {
    borderRadius: 10,
    marginRight: 20,
    // paddingBottom: 20,
    marginBottom: 17,
    borderColor: "white",
  },
  meditationCardImage: {
    width: 200,
    height: 125,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  meditationCardTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    color: "white",
  },
  meditationCardDescription: {
    fontSize: 16,
    marginBottom: 16,
    marginTop: 16,
    color: "white",
    textAlign: "left",
  },
  meditationCardButton: {
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
