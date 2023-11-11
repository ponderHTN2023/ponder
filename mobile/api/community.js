export const getDiscoverCommunities = async (userId) => {
  let response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/api/communities/discover/${userId}`
  );
  const data = await response.json();
  return { status: response.status, data };
};

export const getUserCommunities = async (userId) => {
  let response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/api/users/${userId}/communities/`
  );
  const data = await response.json();
  return { status: response.status, data };
};

export const createCommunity = async (community) => {
  let response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/api/communities/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(community),
    }
  );
  const data = await response.json();
  return { status: response.status, data };
};

export const getCommunity = async (communityId) => {
  let response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/api/communities/${communityId}`
  );
  const data = await response.json();
  return { status: response.status, data };
};
