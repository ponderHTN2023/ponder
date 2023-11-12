import Constants from "expo-constants";

export const createMeditation = async (data) => {
  let response = await fetch(
    `${Constants.expoConfig.extra.serverUrl}/api/meditation`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  const res = await response.json();

  return { status: response.status, uri: res.meditation };
};

export const saveMeditation = async (id, data) => {
  let response = await fetch(
    `${Constants.expoConfig.extra.serverUrl}/api/activities/${id}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  return { status: response.status };
};
