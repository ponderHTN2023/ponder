import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.splashImage}
        source={require("../assets/splash.png")}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2A0060",
  },
  splashImage: {
    width: windowWidth,
    height: windowHeight,
  },
});

export default Splash;
