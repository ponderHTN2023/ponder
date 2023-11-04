import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GuidedMeditationTimer from "./screens/GuidedMeditationTimer";
import Onboarding from "./screens/Onboarding";
import Onboarding2 from "./screens/Onboarding2";
import Onboarding3 from "./screens/Onboarding3";
import Onboarding4 from "./screens/Onboarding4";
import BottomTabs from "./screens/BottomTabs";
import Duration from "./screens/Duration";
import GuidedMeditationOptionalScreen from "./screens/GuidedMeditationOptionalScreen";
import GuidedMeditationScreen from "./screens/GuidedMeditationScreen";
import Auth from "./screens/Auth";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import { StateProvider } from "./context/state";
import MeditationDetails from "./screens/MeditationDetails";
import MeditationTimer from "./screens/MeditationTimer";
import ManualMeditation from "./screens/ManualMeditation";
import CreateCommunity from "./screens/CreateCommunity";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const Stack = createStackNavigator();

console.log("expoConfig:", Constants.expoConfig.extra);
console.log("env:", process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY);
export default function App() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={Constants.expoConfig.extra.clerkPublishableKey}
    >
      <StateProvider>
        <NavigationContainer>
          <SignedOut>
            <Stack.Navigator initialRouteName="Auth">
              <Stack.Screen
                name="Auth"
                component={Auth}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </SignedOut>
          <SignedIn>
            <Stack.Navigator initialRouteName="BottomTabs">
              <Stack.Screen
                name="Onboarding"
                component={Onboarding}
                options={{ headerShown: false, gestureEnabled: false }}
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
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                  animation: "slide_from_left",
                }}
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
                name="MeditationDetails"
                component={MeditationDetails}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="GuidedMeditationTimer"
                component={GuidedMeditationTimer}
                options={{
                  headerShown: false,
                  title: "Guided Meditation Timer",
                }}
              />
              <Stack.Screen
                name="MeditationTimer"
                component={MeditationTimer}
                options={{
                  headerShown: false,
                  title: "Meditation Timer",
                  presentation: "modal",
                }}
              />
              <Stack.Screen
                name="ManualMeditation"
                component={ManualMeditation}
                options={{
                  headerShown: false,
                  presentation: "modal",
                }}
              />
              <Stack.Screen
                name="CreateCommunity"
                component={CreateCommunity}
                options={{
                  headerShown: false,
                  presentation: "modal",
                }}
              />
            </Stack.Navigator>
          </SignedIn>
        </NavigationContainer>
      </StateProvider>
    </ClerkProvider>
  );
}
