import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SessionCard from "../SessionCard";

const ActivityTab = ({ community }) => {
  return (
    <View style={styles.container}>
      {community.posts.map((post) => (
        <SessionCard key={session.id} {...post} />
      ))}
    </View>
  );
};

export default ActivityTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
