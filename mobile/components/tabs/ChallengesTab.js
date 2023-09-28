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
import { getChallenges } from "../../api/challenges";
import Challenge from "../Challenge";

export default function ChallengesTab() {
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
        Weekly Challenges
      </Text>
      <FlatList
        data={challenges}
        renderItem={({ item }) => (
          <Challenge
            id={item.id}
            title={item.title}
            description={item.content}
            buttonText="View"
            checked={item.completed}
            color="#1DAABD"
            buttonColor="rgba(29, 0, 65, 0.49)"
          />
        )}
        keyExtractor={(item) => item.id}
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
