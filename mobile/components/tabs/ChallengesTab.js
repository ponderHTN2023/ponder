import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { getChallenges } from "../../api/challenges";
import Challenge from "../Challenge";
import { StateContext } from "../../context/state";
import Loading from "../Loading";

export default function ChallengesTab() {
  const [challenges, setChallenges] = React.useState([]);
  const [user, setUser] = useContext(StateContext);

  const sortedChallenges = (challenges) => {
    return challenges.sort((a, b) => {
      if (a.completed && !b.completed) {
        return 1;
      } else if (!a.completed && b.completed) {
        return -1;
      } else {
        return 0;
      }
    });
  };

  populateChallenges = async () => {
    getChallenges(user.id).then((res) => {
      if (res.status !== 200) {
        return;
      }
      setChallenges(res.data);
    });
  };

  useEffect(() => {
    populateChallenges();
  }, []);

  if (challenges.length === 0) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Loading text={"Generating weekly challenges..."} />
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.page}>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          display: "flex",
          marginBottom: 32,
          fontWeight: "500",
          textAlign: "center",
        }}
      >
        Weekly Challenges
      </Text>
      <FlatList
        data={sortedChallenges(challenges)}
        renderItem={({ item }) => (
          <Challenge
            id={item.id}
            title={item.title}
            onReset={() => populateChallenges()}
            description={item.content}
            isChecked={item.completed}
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
  loadingContainer: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    backgroundColor: "#2A0060",
    justifyContent: "center",
  },
});
