import React, { useEffect, useState, useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import CommunityListItem from "../CommunityListItem";
import { useNavigation } from "@react-navigation/native";
import {
  getUserCommunities,
  getDiscoverCommunities,
} from "../../api/community";
import { StateContext } from "../../context/state";

export default function CommunityTab() {
  const navigation = useNavigation();
  const [user, setUser] = useContext(StateContext);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    if (user) {
      (async () => {
        const joined = await getUserCommunities(user.id);
        const all = await getDiscoverCommunities(user.id);
        setJoinedCommunities(joined["data"]);
        setCommunities(all["data"]);
      })();
    }
  }, [user]);

  return (
    <View style={styles.page}>
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <Text style={styles.title}>Communities</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateCommunity")}
        >
          <Image
            source={require("../../assets/create-community.png")}
            style={styles.createIcon}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {joinedCommunities.length > 0 && (
          <View>
            <Text style={styles.subtitle}>My Communities</Text>
            {joinedCommunities.map((community) => (
              <CommunityListItem
                id={community.id}
                key={community.id}
                name={community.name}
                description={community.description}
                members={community.members}
                bannerImage=""
              />
            ))}
          </View>
        )}
        {communities && (
          <View style={{ marginTop: 36 }}>
            <Text style={styles.subtitle}>Discover</Text>
            {communities.map((community) => (
              <CommunityListItem
                id={community.id}
                key={community.id}
                name={community.name}
                description={community.description}
                members={community.members}
                bannerImage=""
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#2A0060",
    paddingHorizontal: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    display: "flex",
    marginBottom: 32,
    marginTop: 32,
    fontWeight: "500",
    textAlign: "center",
    marginLeft: 47,
    flex: 1,
  },
  createIcon: {
    marginLeft: "auto",
  },
  subtitle: {
    color: "white",
    fontSize: 20,
    display: "flex",
    marginBottom: 6,
    fontWeight: "700",
    alignSelf: "flex-start",
    textAlign: "left",
  },
});
