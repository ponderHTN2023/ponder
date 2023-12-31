import React, { useContext } from "react";
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
import SessionItem from "../SessionItem";

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
            source={require("../../assets/icon2.png")}
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
          <Image
            source={require("../../assets/plus.png")}
            style={styles.plusIcon}
          />
          <View>
            <Text style={styles.buttonTitle}>Add Meditation Manually</Text>
            <Text style={styles.buttonSubtitle}>
              Meditated without Ponder? No problem.
            </Text>
          </View>
        </TouchableOpacity>
        <View>
          <View style={styles.listContainer}>
            <Text style={styles.historyTitle}>Session history</Text>
            {user.sessions.slice(0, 3).map((item) => (
              <SessionItem
                key={item.id}
                id={item.id}
                duration={item.duration}
                name={item.name}
                emotion={item.emotion}
                technique={item.technique}
                description={item.description}
                uri={item.uri}
                onPress={() => {
                  if (item.uri) {
                    navigation.navigate("GuidedMeditationTimer", {
                      emotion: item.emotion,
                      technique: item.technique,
                      sessionUri: item.uri,
                      duration: item.duration,
                    });
                  }
                }}
              />
            ))}
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={{ ...styles.sessionButton, marginTop: 20 }}
                onPress={() => navigation.navigate("History")}
              >
                <Text style={styles.sessionText}>View All</Text>
              </TouchableOpacity>
            </View>
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
  sessionButton: {
    padding: 10,
    alignItems: "center",
    width: 217,
    borderRadius: 20,
    backgroundColor: "#7000E0",
  },
  listContainer: {
    marginBottom: 30,
    marginHorizontal: 20,
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
  plusIcon: {
    width: 26,
    height: 26,
    marginRight: 16,
  },
  nameContainer: {
    marginLeft: 24,
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: "#7000E0",
    marginHorizontal: 20,
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 48,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  buttonSubtitle: {
    fontSize: 14,
    marginTop: 4,
    color: "white",
  },
  historyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
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
  sessionText: {
    color: "white",
    fontWeight: "500",
    fontSize: 18,
    textAlign: "left",
  },
});

export default ProfileTab;
