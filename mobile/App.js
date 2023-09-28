import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MeditationTimer from "./screens/MeditationTimer";
import Onboarding from "./screens/Onboarding";
import Onboarding2 from "./screens/Onboarding2";
import Onboarding3 from "./screens/Onboarding3";
import Onboarding4 from "./screens/Onboarding4";
import BottomTabs from "./components/tabs/BottomTabs";
import Duration from "./screens/Duration";
import GuidedMeditationOptionalScreen from "./screens/GuidedMeditationOptionalScreen";
import GuidedMeditationScreen from "./screens/GuidedMeditationScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding2"
          component={Onboarding2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding3"
          component={Onboarding3}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding4"
          component={Onboarding4}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GuidedMeditation"
          component={GuidedMeditationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GuidedMeditationOptional"
          component={GuidedMeditationOptionalScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Duration"
          component={Duration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MeditationTimer"
          component={MeditationTimer}
          options={{ headerShown: false, title: "Meditation Timer" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
