import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { StateContext } from "../../context/state";
import { Ionicons } from "@expo/vector-icons";
import SessionCard from "../SessionCard";
import { useAuth } from "@clerk/clerk-react";

const ProfileTab = ({ route, navigation }) => {
  const [user, setUser] = useContext(StateContext);
  const { signOut, sessionId, getToken } = useAuth();
  const memberSince =
    user.createdAt.split("-")[2].split("T")[0] +
    "/" +
    user.createdAt.split("-")[1] +
    "/" +
    user.createdAt.split("-")[0];

  const onSignOut = async () => {
    setUser(null);
    await signOut();
    console.log("signed out!");
    navigation.navigate("Auth");
  };

  return (
    <ScrollView style={styles.page}>
      <View
        style={{
          alignItems: "flex-end",
          marginTop: 16,
          marginRight: 24,
        }}
      >
        <TouchableOpacity onPress={onSignOut}>
          <Text style={{ fontSize: 14, color: "#C9B0FF" }}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.logo}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.title}>{user.name}</Text>
            <Text style={styles.subtitle}>Member since {memberSince}</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View>
            <Text style={styles.statValue}>{user.numMeditations || 0}</Text>
            <Text style={styles.statTitle}>Total Sessions</Text>
          </View>
          <View>
            <Text style={styles.statValue}>{user.minMeditated || 0}</Text>
            <Text style={styles.statTitle}>Mindful Minutes</Text>
          </View>
          <View>
            <Text style={styles.statValue}>{user.avgDuration || 0}</Text>
            <Text style={styles.statTitle}>Avg Duration</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("ManualMeditation")}
        >
          <Text style={styles.buttonText}>Add Meditation Manually +</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.historyTitle}>Session history</Text>
          <View style={styles.listContainer}>
            {user.sessions.map((item) => (
              <SessionCard
                key={item.id}
                id={item.id}
                date={item?.created_at}
                duration={item.duration}
                emotion={item.emotion}
                technique={item.technique}
                description={item.description}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#2A0060",
  },
  container: {
    height: "100%",
    color: "white",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginBottom: 30,
  },
  listContainer: {
    width: "85%",
    marginBottom: 30,
  },
  header: {
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    marginBottom: 36,
    marginTop: 36,
  },
  logo: {
    width: 100,
    height: 100,
  },
  nameContainer: {
    marginLeft: 24,
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: "#7000E0",
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 22,
    alignItems: "center",
    marginBottom: 48,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  statTitle: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 8,
    color: "white",
    marginBottom: 24,
  },
  statValue: {
    fontSize: 28,
    textAlign: "center",
    color: "white",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "white",
  },
});

export default ProfileTab;
