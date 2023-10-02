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
import JournalsTab from "../components/tabs/JournalsTab";
import { useUser } from "@clerk/clerk-react";
import Loading from "../components/Loading";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
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
    console.log("data:", res.data);
    setUser({
      id: res.data["id"],
      email: res.data["email"],
      name: res.data["first_name"],
    });
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#2A0060" }}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { height: 60 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeTab}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => {
              const image = focused
                ? require("../assets/home-selected.png")
                : require("../assets/home.png");
              return <Image source={image} />;
            },
            headerShown: false,
            tabBarIconStyle: styles.tabBarIcon,
            tabBarStyle: { backgroundColor: "#2A0060" },
            tabBarLabelStyle: styles.tabBarLabel,
          }}
        />
        <Tab.Screen
          name="Challenges"
          component={ChallengesTab}
          options={{
            tabBarLabel: "Challenges",
            tabBarIcon: ({ focused }) => {
              const image = focused
                ? require("../assets/checkmark-selected.png")
                : require("../assets/checkmark.png");
              return <Image source={image} />;
            },
            headerShown: false,
            tabBarIconStyle: styles.tabBarIcon,
            tabBarStyle: { backgroundColor: "#2A0060" },
            tabBarLabelStyle: styles.tabBarLabel,
          }}
        />
        <Tab.Screen
          name="Journals"
          component={JournalsTab}
          options={{
            tabBarLabel: "Journals",
            tabBarIcon: ({ focused }) => {
              const image = focused
                ? require("../assets/yoga-selected.png")
                : require("../assets/yoga.png");
              return <Image source={image} />;
            },
            headerShown: false,
            tabBarIconStyle: styles.tabBarIcon,
            tabBarStyle: { backgroundColor: "#2A0060" },
            tabBarLabelStyle: styles.tabBarLabel,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
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
    width: 29,
    height: 26,
    flexShrink: 0,
    backgroundColor: "lightgray",
  },
  tabBarIcon: {
    marginTop: 9,
    marginBottom: 5,
  },
  tabBarLabel: {
    color: "white",
    fontSize: 12,
    alignItems: "center",
  },
});