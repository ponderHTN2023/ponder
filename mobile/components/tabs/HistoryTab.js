import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { StateContext } from "../../context/state";
import SessionItem from "../SessionItem";
import Loading from "../Loading";
import { TouchableOpacity } from "react-native-gesture-handler";

const HistoryTab = ({ navigation }) => {
  const [user, setUser] = useContext(StateContext);
  const [sessions, setSessions] = useState({});

  useEffect(() => {
    if (user) {
      let sessionDates = {};
      user.sessions.forEach((session) => {
        const date = new Date(session.created_at).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        if (sessionDates[date]) {
          sessionDates[date].push(session);
        } else {
          sessionDates[date] = [session];
        }
      });
      setSessions(sessionDates);
    }
  }, [user]);

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    );
  }

  const onPressSession = (session) => {
    if (session.uri) {
      navigation.navigate("GuidedMeditationTimer", {
        emotion: session.emotion,
        technique: session.technique,
        sessionUri: session.uri,
        duration: session.duration,
      });
    }
  };

  const sessionSection = (date) => {
    return (
      <View key={date}>
        <Text style={styles.sectionTitle}>{date}</Text>
        {sessions[date].map((session) => (
          <SessionItem
            key={session.id}
            id={session.id}
            name={session.name}
            emotion={session.emotion}
            technique={session.technique}
            duration={session.duration}
            description={session.description}
            uri={session.uri}
            onPress={() => onPressSession(session)}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Meditation History</Text>
        </View>
        {sessions && Object.keys(sessions).length > 0 ? (
          Object.keys(sessions).map((date) => {
            return sessionSection(date);
          })
        ) : (
          <View style={styles.emptyContainer}>
            <Image
              source={require("../../assets/empty-list.png")}
              style={{ width: 200, height: 200 }}
            />
            <Text style={styles.empty}>
              Your meditation story starts here. Take your first step towards
              tranquility.
            </Text>
            <TouchableOpacity
              style={styles.sessionButton}
              onPress={() => navigation.navigate("MeditationOptions")}
            >
              <Text style={styles.sessionText}>Start Meditating</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2A0060",
    width: "100%",
    padding: 20,
    paddingBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "white",
    marginTop: 24,
  },
  header: {},
  title: {
    fontSize: 20,
    fontWeight: "600",
    paddingBottom: 10,
    color: "white",
    marginTop: 20,
    textAlign: "center",
    // fontFamily: "Lato-Bold",
  },
  empty: {
    fontSize: 16,
    color: "white",
    marginTop: 24,
    textAlign: "center",
    width: 300,
    fontFamily: "Lato-Regular",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    height: 500,
  },
  loadingContainer: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    backgroundColor: "#2A0060",
    justifyContent: "center",
  },
  sessionButton: {
    backgroundColor: "#7000E0",
    borderRadius: 14,
    paddingVertical: 16,
    width: 225,
    paddingHorizontal: 22,
    alignItems: "center",
    marginTop: 36,
    alignSelf: "center",
  },
  sessionText: {
    color: "white",
    fontWeight: "500",
    fontSize: 18,
    textAlign: "center",
  },
});

export default HistoryTab;
