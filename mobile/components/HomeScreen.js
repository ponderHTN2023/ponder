import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { getChallenges } from "../api/challenges";
import Challenge from "./Challenge";

function Card({ title, description, buttonText, onPress, color, buttonColor }) {
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

function HomeScreen() {
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
          Happy Sunday,{"\n"}Sebastian!
        </Text>
      </View>
      <Card
        title="Guided Meditation"
        description={`How are you feeling today, Sebastian?`}
        buttonText="Check In"
        color="#D847AF"
        buttonColor="rgba(29, 0, 65, 0.49)"
        onPress={() => navigation.navigate("GuidedMeditation")}
      />
      <Card
        title="Weekly Challenges"
        description={
          <>
            <Text style={{ textDecorationLine: 'underline' }}>Self-Compassion Practice</Text>
            <Text>{`\n\nWrite a letter of self-compassion to yourself, acknowledging your strengths and forgiving your imperfections.`}</Text>
          </>
        }
        buttonText="View"
        color="#1DAABD"
        buttonColor="rgba(29, 0, 65, 0.49)"
        onPress={() => navigation.navigate("Challenges")}
      />

      <Card
        title="Journal"
        color="#FF8A00"
        buttonText="New Entry"
        buttonColor="rgba(29, 0, 65, 0.49)"
      />
    </View>
  );
}

function MeditationScreen() {
  const navigation = useNavigation();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      navigation.navigate("GuidedMeditation");
    });

    return unsubscribe;
  }, [navigation]);

  return null;
}

// Sample Challenges Screen
function ChallengesScreen() {
  const [challenges, setChallenges] = React.useState([]);

  useEffect(() => {
    getChallenges().then((res) => {
      if (res.status !== 200) {
        return;
      }
      setChallenges(res.data);
    });
  }, []);
  if (challenges.length === 0) {
    return (
      <View style={styles.page}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.page}>
      <FlatList
        data={challenges}
        renderItem={({ item }) => (
          <Challenge
            title={item.title}
            description={item.description}
            buttonText="View"
            color="#1DAABD"
            buttonColor="rgba(29, 0, 65, 0.49)"
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#2A0060" }}>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => {
              const image = focused
                ? require("../assets/home-selected.png")
                : require("../assets/home.png");
              return <Image source={image} />;
            },
            headerShown: false,
            tabBarIconStyle: { marginTop: 9, marginBottom: 5 },
            tabBarStyle: { backgroundColor: "#2A0060" },
            tabBarLabelStyle: {
              color: "white",
              fontSize: 12,
              alignItems: "center",
            },
          }}
        />
        <Tab.Screen
          name="Meditation"
          component={MeditationScreen}
          options={{
            tabBarLabel: "Meditate",
            tabBarIcon: ({ focused }) => {
              const image = focused
                ? require("../assets/yoga-selected.png")
                : require("../assets/yoga.png");
              return <Image source={image} />;
            },
            headerShown: false,
            tabBarIconStyle: { marginTop: 9, marginBottom: 5 },
            tabBarStyle: { backgroundColor: "#2A0060" },
            tabBarLabelStyle: {
              color: "white",
              fontSize: 12,
              alignItems: "center",
            },
          }}
        />
        <Tab.Screen
          name="Challenges"
          component={ChallengesScreen}
          options={{
            tabBarLabel: "Challenges",
            tabBarIcon: ({ focused }) => {
              const image = focused
                ? require("../assets/checkmark-selected.png")
                : require("../assets/checkmark.png");
              return <Image source={image} style={styles.tabIcon} />;
            },
            headerShown: false,
            tabBarIconStyle: { marginTop: 9, marginBottom: 5 },
            tabBarStyle: { backgroundColor: "#2A0060" },
            tabBarLabelStyle: {
              color: "white",
              fontSize: 12,
              alignItems: "center",
            },
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    height: "100%",
    padding: 20,
    backgroundColor: "#2A0060",
  },
  card: {
    // borderWidth: 1,
    // borderColor: "lightgray",
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
  },
  homeIcon: {
    width: 29,
    height: 26,
    flexShrink: 0,
    backgroundColor: "lightgray",
  },
});
