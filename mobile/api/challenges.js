export const getChallenges = async () => {
  let response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/api/challenges`
  );
  const data = await response.json();
  return { status: response.status, data };
};

export const updateChallenge = async (challenge) => {
  let response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/api/challenges/${challenge["id"]}`,
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
