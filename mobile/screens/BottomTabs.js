import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StateContext } from "../context/state";
import { getUser } from "../api/user";
import { useNavigation } from "@react-navigation/native";
import ChallengesTab from "../components/tabs/ChallengesTab";
import HomeTab from "../components/tabs/HomeTab";
import { useUser } from "@clerk/clerk-react";
import Loading from "../components/Loading";
import ExploreTab from "../components/tabs/ExploreTab";
import TimerTab from "../components/tabs/TimerTab";
import { MaterialIcons } from "@expo/vector-icons";
import ProfileTab from "../components/tabs/ProfileTab";
import CommunityTab from "../components/tabs/CommunityTab";
import HistoryTab from "../components/tabs/HistoryTab";

const Tab = createBottomTabNavigator();

export default function BottomTabs({ onLayout }) {
  const { isLoaded, isSignedIn, user: authUser } = useUser();
  const [user, setUser] = useContext(StateContext);

  useEffect(() => {
    console.log("isLoaded and inside BottomTabs!!", user);
    if (isLoaded && isSignedIn && !user) {
      processUser();
    }
  }, [isLoaded]);

  const processUser = async () => {
    const res = await getUser(authUser.emailAddresses);
    setUser({
      id: res.data["id"],
      email: res.data["email"],
      name: res.data["name"],
      createdAt: res.data["created_at"],
      minMeditated: res.data["min_meditated"] || 0,
      numMeditations: res.data["num_meditations"] || 0,
      avgDuration: res.data["avg_duration"] || 0,
      sessions: res.data["sessions"] || [],
    });
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.loadingContainer} onLayout={onLayout}>
        <Loading />
      </SafeAreaView>
    );
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: "#2A0060", paddingTop: 40 }}
      onLayout={onLayout}
    >
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { height: 60 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeTab}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => {
              const image = focused
                ? require("../assets/home-selected.png")
                : require("../assets/home.png");
              return <Image source={image} style={styles.homeIcon} />;
            },
            headerShown: false,
            tabBarStyle: { backgroundColor: "#2A0060" },
            tabBarLabelStyle: styles.tabBarLabel,
          }}
        />
        <Tab.Screen
          name="Timer"
          component={TimerTab}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => {
              const image = focused ? (
                <MaterialIcons
                  name="timer"
                  style={{ marginTop: 9 }}
                  size={30}
                  color="#C9B0FF"
                />
              ) : (
                <MaterialIcons
                  name="timer"
                  style={{ marginTop: 9 }}
                  size={30}
                  color="white"
                />
              );
              return image;
            },
            headerShown: false,
            tabBarStyle: { backgroundColor: "#2A0060" },
            tabBarLabelStyle: styles.tabBarLabel,
          }}
        />
        {/* <Tab.Screen
          name="Community"
          component={CommunityTab}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => {
              const image = focused
                ? require("../assets/people-selected.png")
                : require("../assets/people.png");
              return <Image source={image} style={styles.communityIcon} />;
            },
            headerShown: false,
            tabBarStyle: { backgroundColor: "#2A0060" },
            tabBarLabelStyle: styles.tabBarLabel,
          }}
        /> */}
        <Tab.Screen
          name="History"
          component={HistoryTab}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => {
              const image = focused
                ? require("../assets/checkmark-selected.png")
                : require("../assets/checkmark.png");
              return <Image source={image} style={styles.challengeIcon} />;
            },
            headerShown: false,
            tabBarStyle: { backgroundColor: "#2A0060" },
            tabBarLabelStyle: styles.tabBarLabel,
          }}
        />
        {/* <Tab.Screen
          name="Explore"
          component={ExploreTab}
          options={{
            tabBarLabel: "Explore",
            tabBarIcon: ({ focused }) => {
              const image = focused
                ? require("../assets/yoga-selected.png")
                : require("../assets/yoga.png");
              return <Image source={image} style={styles.meditateIcon} />;
            },
            headerShown: false,
            tabBarStyle: { backgroundColor: "#2A0060" },
            tabBarLabelStyle: styles.tabBarLabel,
          }}
        /> */}
        <Tab.Screen
          name="Profile"
          component={ProfileTab}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => {
              const image = focused
                ? require("../assets/profile-selected.png")
                : require("../assets/profile.png");
              return <Image source={image} style={styles.profileIcon} />;
            },
            headerShown: false,
            tabBarStyle: { backgroundColor: "#2A0060" },
            tabBarLabelStyle: styles.tabBarLabel,
          }}
        />
      </Tab.Navigator>
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
  homeIcon: {
    marginTop: 9,
    width: 24,
    height: 24,
  },
  meditateIcon: {
    marginTop: 9,
    width: 17,
    height: 24,
  },
  challengeIcon: {
    marginTop: 9,
    width: 22,
    height: 22,
  },
  profileIcon: {
    marginTop: 9,
    width: 28,
    height: 28,
  },
  communityIcon: {
    marginTop: 9,
    width: 32,
    height: 32,
  },
  loadingContainer: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    backgroundColor: "#2A0060",
    justifyContent: "center",
  },
  tabBarLabel: {
    color: "white",
    fontSize: 12,
    alignItems: "center",
  },
});
