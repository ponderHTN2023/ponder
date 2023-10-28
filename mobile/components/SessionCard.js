import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Divider,
  Image,
} from "react-native";

const SessionCard = ({
  id,
  date,
  emotion,
  description,
  technique,
  name,
  duration,
}) => {
  console.log(date);
  const formattedDate =
    date.split("-")[2].split("T")[0] +
    "-" +
    date.split("-")[1] +
    "-" +
    date.split("-")[0];

  const formattedDuration = () => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{formattedDate}</Text>
      {description && <Text style={styles.cardDescription}>{description}</Text>}
      <View style={styles.infoContainer}>
        <View style={styles.section}>
          <Text style={styles.infoTitle}>Emotion</Text>
          <Text style={styles.infoValue}>{emotion || "N/A"}</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.section}>
          <Text style={styles.infoTitle}>Technique</Text>
          <Text style={styles.infoValue}>{technique || "N/A"}</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.section}>
          <Text style={styles.infoTitle}>Duration</Text>
          <Text style={styles.infoValue}>{formattedDuration()}</Text>
        </View>
      </View>
    </View>
  );
};

export default SessionCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: "#B353FF",
    width: 325,
    padding: 20,
    marginBottom: 17,
  },
  section: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 14,
    color: "white",
  },
  divider: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: 1,
    backgroundColor: "#7000E0",
    opacity: 0.45,
    marginTop: "auto",
    marginBottom: "auto",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#C9B0FF",
    marginBottom: 16,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
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
