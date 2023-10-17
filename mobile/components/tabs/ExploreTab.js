import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import MeditationCard from "../MeditationCard";
import { useNavigation } from "@react-navigation/native";

export default function ExploreTab() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2A0060",
        padding: 20,
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
        Explore Meditations
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 18,
          display: "flex",
          marginBottom: 12,
          fontWeight: "500",
          alignSelf: "flex-start",
          textAlign: "left",
        }}
      >
        Relaxation and Stress Relief
      </Text>
      <ScrollView horizontal>
        <MeditationCard
          title="Breath Awareness"
          onPress={() =>
            navigation.navigate("MeditationDetails", {
              key: "breath-awareness",
            })
          }
        />
        <MeditationCard title="Mindfulness Meditation" />
        {/* <MeditationCard
          title="Relaxation and Stress Relief"
          description="Meditation techniques designed to calm the mind, soothe the nervous system, and alleviate stress."
        />
        <MeditationCard
          title="Spiritual Development"
          description="Profound practices aimed at spiritual growth, enlightenment, and transcending the ordinary state of consciousness."
        />
        <MeditationCard
          title="Awareness and Insight"
          description="Practices focused on cultivating a deeper understanding of the present moment and gaining insight into the nature of reality."
        />
        <MeditationCard
          title="Concentration and Focus"
          description="Techniques that train the mind to concentrate on a single point or object, enhancing mental clarity and focus."
        />
        <MeditationCard
          title="Emotional Cultivation"
          description="Meditation methods that nurture positive emotions such as love, compassion, and gratitude, fostering emotional well-being."
        />
        <MeditationCard
          title="Spiritual Development"
          description="Profound practices aimed at spiritual growth, enlightenment, and transcending the ordinary state of consciousness."
        />
        <MeditationCard
          title="Energy"
          description="Techniques that work with the body's energy systems, promoting balance, vitality, and enhanced physical well-being."
        /> */}
      </ScrollView>
    </View>
  );
}

const beginnerMeditations = [
  {
    title: "Breath Awareness",
    description: "Learn to focus on your breath",
  },
  {
    title: "Mindfulness Meditation",
    description: "Learn to focus on your breath",
  },
  {
    title: "Mindful Walking",
    description: "Learn to focus on your breath",
  },
  {
    title: "Loving-kindness",
    description: "Learn to focus on your breath",
  },
  {
    title: "Gratitude",
    description: "Learn to focus on your breath",
  },
  {
    title: "Before Bed",
    description: "Learn to focus on your breath",
  },
];

const intermediateMeditations = [
  {
    title: "Heartfulness",
    description: "Learn to focus on your breath",
  },
  {
    title: "Visualization",
    description: "Learn to focus on your breath",
  },
  {
    title: "Transcendental",
    description: "Learn to focus on your breath",
  },
  {
    title: "Vipassana",
    description: "Learn to focus on your breath",
  },
];

const advancedMeditations = [
  {
    title: "Spinal Breathing",
    description: "Learn to focus on your breath",
  },
  {
    title: "Kriya meditation",
    description: "Learn to focus on your breath",
  },
  {
    title: "Samaya meditation",
    description: "Learn to focus on your breath",
  },

  {
    title: "Zen meditation",
    description: "Learn to focus on your breath",
  },
  {
    title: "Anapanasati meditation",
    description: "Learn to focus on your breath",
  },
];
