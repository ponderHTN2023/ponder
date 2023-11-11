import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Card from "../Card";
import { useAuth, useUser } from "@clerk/clerk-react";
import { StateContext } from "../../context/state";

export default function HomeTab() {
  const navigation = useNavigation();
  const [user, setUser] = useContext(StateContext);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <View style={styles.page}>
      <View
        style={{
          marginTop: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 24,
            display: "flex",
            marginBottom: 20,
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          {/* current weekday */}
          Happy{" "}
          {
            currentDate
              .toLocaleDateString("en-Us", { weekday: "long" })
              .split(",")[0]
          }
          ,{"\n"}
          {user.name}
        </Text>
      </View>
      <Card
        title="Guided Meditation"
        description={`How are you feeling today, ${user.name}?`}
        buttonText="Begin"
        color="#B353FF"
        buttonColor="rgba(29, 0, 65, 0.49)"
        onPress={() => navigation.navigate("MeditationOptions")}
      />
      <Card
        title="Weekly Challenges"
        description={
          <View style={{ color: "white" }}>
            <Text
              style={{
                textDecorationLine: "underline",
                fontWeight: "500",
                fontSize: 16,
                marginBottom: 8,
                color: "white",
              }}
            >
              Self-Compassion Practice
            </Text>
            <Text
              style={{ color: "white", fontSize: 16 }}
            >{`Write a letter of self-compassion to yourself, acknowledging your strengths and forgiving your imperfections.`}</Text>
          </View>
        }
        buttonText="View All"
        color="#7000E0"
        buttonColor="rgba(29, 0, 65, 0.49)"
        onPress={() => navigation.navigate("Challenges")}
      />

      <View style={styles.card}>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <Text style={styles.cardTitle}>Journal</Text>
          <View
            style={{
              marginLeft: "auto",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Feather name="calendar" size={16} color="white" />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 8,
                color: "white",
                fontWeight: "500",
              }}
            >
              {formattedDate}
            </Text>
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => navigation.navigate("Journals")}
          >
            <Text style={styles.buttonText}>New Entry</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#2A0060",
  },
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    backgroundColor: "#7000E0",
  },
  cardTitle: {
    fontSize: 24,
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
    backgroundColor: "rgba(29, 0, 65, 0.49)",
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
