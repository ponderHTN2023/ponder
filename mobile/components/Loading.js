import React from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
const Loading = ({ text }) => {
  return (
    <SafeAreaView style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#C9B0FF" />
      {text && (
        <View style={{ textAlign: "center" }}>
          <Text style={styles.text}>{text}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    backgroundColor: "#2A0060",
    justifyContent: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
});
