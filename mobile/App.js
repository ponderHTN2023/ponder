import React, { useState, useEffect, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GuidedMeditationTimer from "./screens/GuidedMeditationTimer";
import { enableScreens } from "react-native-screens";
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
import Community from "./screens/Community";
import MeditationOptions from "./screens/MeditationOptions";
import Splash from "./screens/Splash";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
// import { init } from "@amplitude/analytics-react-native";

// init("11730c6a5e11a86665fd13918f3a20a6", "seb7wake@amplitude.com");

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
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // await Font.loadAsync(Roboto.font);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return <Splash />;
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={Constants.expoConfig.extra.clerkPublishableKey}
      // publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <StateProvider>
        <NavigationContainer>
          <SignedOut>
            <Stack.Navigator initialRouteName="Auth">
              <Stack.Screen name="Auth" options={{ headerShown: false }}>
                {(props) => <Auth {...props} onLayout={onLayoutRootView} />}
              </Stack.Screen>
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
                name="MeditationOptions"
                component={MeditationOptions}
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
              <Stack.Screen
                name="CommunityDetail"
                component={Community}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </SignedIn>
        </NavigationContainer>
      </StateProvider>
    </ClerkProvider>
  );
}
