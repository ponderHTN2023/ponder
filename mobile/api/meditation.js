export const createMeditation = async (data) => {
  let response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/api/meditation`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  const res = await response.json();

  return { status: response.status, uri: res.meditation };
};
