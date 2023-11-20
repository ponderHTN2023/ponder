import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const SessionItem = ({
  id,
  name,
  emotion,
  technique,
  duration,
  description,
  uri,
  onPress,
}) => {
  const getTitle = () => {
    if (emotion && emotion !== "") {
      return emotion;
    } else if (technique && technique !== "") {
      return technique;
    } else {
      return "Self-Guided";
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={
          technique
            ? require("../assets/technique.png")
            : emotion
            ? require("../assets/emotion.png")
            : require("../assets/guide.png")
        }
        style={{ width: 80, height: 80, marginRight: 16 }}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ maxWidth: 200 }}>
          <Text style={styles.title} numberOfLines={2}>
            {getTitle()}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../assets/volume.png")}
              style={{ marginRight: 10, width: 15, height: 15 }}
            />
            <Text style={styles.time}>
              {Math.ceil(duration / 60).toFixed(0)} min
            </Text>
          </View>
          {/* {description && (
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          )} */}
        </View>
        {/* <View style={styles.tag}>
          <Text style={styles.time}>
            {Math.ceil(duration / 60).toFixed(0)} min
          </Text>
        </View> */}
      </View>
      {uri && (
        <Image
          source={require("../assets/chevron-right.png")}
          style={{ marginLeft: "auto" }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 20,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  description: {
    fontSize: 14,
    color: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    fontWeight: "600",
    marginBottom: 10,
  },
  tag: {
    borderRadius: "6px",
    backgroundColor: "rgba(179, 83, 255, 0.20)",
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginLeft: 12,
  },
  time: {
    color: "white",
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    color: "#888",
  },
});

export default SessionItem;
