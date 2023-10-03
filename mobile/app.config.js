module.exports = {
  name: "ponder",
  version: "1.0.0",
  extra: {
    clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  },
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#2A0060",
  },
  backgroundColor: "#2A0060",
};
