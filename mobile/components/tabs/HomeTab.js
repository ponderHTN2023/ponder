import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
    <ScrollView style={styles.page}>
      <View
        style={{
          marginTop: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.title}>
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
        description={`How are you feeling today, ${user.name.split(" ")[0]}?`}
        buttonText="Begin Meditation"
        color="#B353FF"
        buttonColor="rgba(29, 0, 65, 0.49)"
        onPress={() => navigation.navigate("MeditationOptions")}
      />
      <Card
        title="Self-Guided Meditation"
        description={`Set your ideal meditation duration and immerse yourself in stillness without a guide.`}
        buttonText="Start Timer"
        color="#7000E0"
        buttonColor="rgba(29, 0, 65, 0.49)"
        onPress={() => navigation.navigate("Timer")}
      />
      <Card
        title="Session History"
        description={
          "Revisit and replay your past meditations. Track your progress and favorite moments with ease."
        }
        buttonText="View All"
        color="#7000E0"
        buttonColor="rgba(29, 0, 65, 0.49)"
        onPress={() => navigation.navigate("History")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#2A0060",
  },
  title: {
    color: "white",
    fontSize: 24,
    display: "flex",
    marginBottom: 20,
    fontWeight: "500",
    textAlign: "center",
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
