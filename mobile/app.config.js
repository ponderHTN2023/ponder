module.exports = {
  name: "ponder",
  version: "1.0.0",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#2A0060",
  },
  expo: {
    extra: {
      eas: {
        projectId: "112b6286-fd51-419f-8ed3-ba1deb682716",
      },
      clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
    },
    ios: {
      bundleIdentifier: "com.ponder.app",
      supportsTablet: true,
    },
  },
  backgroundColor: "#2A0060",
};
