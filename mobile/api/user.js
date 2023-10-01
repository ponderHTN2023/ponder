export const getUser = async (email) => {
  let response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/api/users/${email}`
  );
  if (response.status === 404) {
    return { status: response.status };
  }
  const data = await response.json();
  return { status: response.status, data };
};

export const createUser = async (user) => {
  console.log("route", `${process.env.EXPO_PUBLIC_SERVER_URL}/api/users/`);
  let response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/api/users/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }
  );
  const data = await response.json();
  return { status: response.status, data };
};
