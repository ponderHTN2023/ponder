import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Card from "../Card";

export default function HomeTab() {
  const navigation = useNavigation();

  return (
    <View style={styles.page}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 24,
            display: "flex",
            marginBottom: 32,
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          Happy Sunday, Sebastian!
        </Text>
      </View>
      <Card
        title="Guided Meditation"
        description={`How are you feeling today, Sebastian?`}
        buttonText="Begin"
        color="#D847AF"
        buttonColor="rgba(29, 0, 65, 0.49)"
        onPress={() => navigation.navigate("GuidedMeditation")}
      />
      <Card
        title="Weekly Challenges"
        description={
          <>
            <Text style={{ textDecorationLine: "underline" }}>
              Self-Compassion Practice
            </Text>
            <Text>{`\n\nWrite a letter of self-compassion to yourself, acknowledging your strengths and forgiving your imperfections.`}</Text>
          </>
        }
        buttonText="View All"
        color="#1DAABD"
        buttonColor="rgba(29, 0, 65, 0.49)"
        onPress={() => navigation.navigate("Challenges")}
      />

      <Card
        title="Journal"
        color="#FF8A00"
        description={"Coming soon..."}
        buttonText="New Entry"
        buttonColor="rgba(29, 0, 65, 0.49)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    height: "100%",
    padding: 20,
    backgroundColor: "#2A0060",
  },
});
