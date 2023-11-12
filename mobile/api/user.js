import Constants from "expo-constants";

export const getUser = async (email) => {
  console.log(
    "route",
    `${Constants.expoConfig.extra.serverUrl}/api/users/${email}`
  );
  let response = await fetch(
    `${Constants.expoConfig.extra.serverUrl}/api/users/${email}`
  );
  if (response.status === 404) {
    return { status: response.status };
  }
  const data = await response.json();
  return { status: response.status, data };
};

export const createUser = async (user) => {
  console.log("route", `${Constants.expoConfig.extra.serverUrl}/api/users/`);
  let response = await fetch(
    `${Constants.expoConfig.extra.serverUrl}/api/users/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }
  );
  const data = await response.json();
  return { status: response.status, data };
};
