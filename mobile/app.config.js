module.exports = {
  name: "ponder",
  version: "1.0.1",
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
        "pk_test_c2tpbGxlZC1wb3NzdW0tNTUuY2xlcmsuYWNjb3VudHMuZGV2JA",
      serverUrl: "https://www.useponder.app:8000",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      bundleIdentifier: "app.useponder.ponder",
      supportsTablet: true,
      buildNumber: "2",
    },
    android: {
      package: "app.useponder.ponder",
    },
    icon: "./assets/icon2.png",
  },
  backgroundColor: "#2A0060",
};
