import Constants from "expo-constants";

export const getChallenges = async (userId) => {
  let response = await fetch(
    `${Constants.expoConfig.extra.serverUrl}/api/users/${userId}/challenges`
  );
  const data = await response.json();
  return { status: response.status, data };
};

export const updateChallenge = async (challenge) => {
  let response = await fetch(
    `${Constants.expoConfig.extra.serverUrl}/api/challenges/${challenge["id"]}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: challenge["completed"] }),
    }
  );
  const data = await response.json();
  return { status: response.status, data };
};
