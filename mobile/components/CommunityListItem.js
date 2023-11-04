import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

const CommunityListItem = ({
  id,
  name,
  description,
  members,
  bannerImage,
  navigation,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Community", { id: id })}
    >
      <Image
        source={require("../assets/default-banner.png")}
        style={styles.banner}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {name}
        </Text>
        <Text style={styles.members}>
          {members} {members === 1 ? "member" : "members"}
        </Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CommunityListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2A0060",
    borderRadius: 10,
    flexDirection: "row",
    paddingVertical: 16,
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "left",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
  members: {
    color: "#C9B0FF",
    marginTop: 2,
    fontSize: 14,
    fontWeight: "500",
  },
  description: {
    color: "white",
    fontSize: 14,
    width: 250,
    fontWeight: "500",
    marginTop: 8,
  },
  banner: {
    width: 80,
    height: 80,
    borderColor: "white",
    borderWidth: 0.5,
    borderRadius: 20,
    marginRight: 24,
  },
});
