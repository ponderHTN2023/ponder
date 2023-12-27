module.exports = {
  name: "ponder",
  version: "1.0.2",
  expo: {
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#2A0060",
    },
    extra: {
      eas: {
        projectId: "112b6286-fd51-419f-8ed3-ba1deb682716",
      },
      clerkPublishableKey:
        process.env.EXPO_PUBLIC_ENVIRONMENT === "DEV"
          ? "pk_test_c2tpbGxlZC1wb3NzdW0tNTUuY2xlcmsuYWNjb3VudHMuZGV2JA"
          : "pk_live_Y2xlcmsudXNlcG9uZGVyLmFwcCQ",
      serverUrl:
        process.env.EXPO_PUBLIC_ENVIRONMENT === "DEV"
          ? "http://localhost:8000"
          : "https://server.useponder.app",
      isProd: process.env.EXPO_PUBLIC_ENVIRONMENT === "PROD",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      bundleIdentifier: "app.useponder.ponder",
      supportsTablet: true,
      buildNumber: "5",
      infoPlist: {
        UIBackgroundModes: ["audio"],
      },
    },
    android: {
      package: "app.useponder.ponder",
    },
    icon: "./assets/icon2.png",
  },
  backgroundColor: "#2A0060",
};
