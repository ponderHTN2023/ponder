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
    <>
      <ActivityIndicator size="large" color="#C9B0FF" />
      {text && (
        <View style={{ textAlign: "center" }}>
          <Text style={styles.text}>{text}</Text>
        </View>
      )}
    </>
  );
};

export default Loading;

const styles = StyleSheet.create({
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
});
