import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { getCommunity } from "../api/community";
import ActivityTab from "../components/tabs/ActivityTab";

function Community({ route, navigation }) {
  const [community, setCommunity] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("activity");

  useEffect(() => {
    console.log(route.params.id);
    if (route.params?.id) {
      (async () => {
        const community = await getCommunity(route.params.id);
        setCommunity(community["data"]);
        setMembers(community["data"]["members"]);
        console.log("community:", community["data"]);
        console.log("members:", community["data"]["members"]);
        setLoading(false);
      })();
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/default-banner.png")}
        style={styles.backgroundImgae}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{community?.name}</Text>
        <Text style={styles.members}>
          {members.length} {members === 1 ? "member" : "members"}
        </Text>
        <Text style={styles.description}>{community?.description}</Text>
      </View>
      <View style={styles.tabbar}>
        <TouchableOpacity
          style={tab === "activity" ? styles.selected : {}}
          onPress={() => setTab("activity")}
        >
          <Text
            style={
              tab === "activity" ? styles.tabbarTextSelected : styles.tabbarText
            }
          >
            Activity
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tab === "events" ? styles.selected : {}}
          onPress={() => setTab("events")}
        >
          <Text
            style={
              tab === "events" ? styles.tabbarTextSelected : styles.tabbarText
            }
          >
            Events
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tab === "about" ? styles.selected : {}}
          onPress={() => setTab("about")}
        >
          <Text
            style={
              tab === "about" ? styles.tabbarTextSelected : styles.tabbarText
            }
          >
            About
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        {tab === "activity" && <ActivityTab community={community} />}
        {tab === "events" && (
          <View>
            <Text>Events</Text>
          </View>
        )}
        {tab === "about" && (
          <View>
            <Text>About</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default Community;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2A0060",
  },
  section: {
    borderTopColor: "white",
    borderTopWidth: 1,
    width: "100%",
  },
  backgroundImgae: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  titleContainer: {
    alignItems: "left",
    width: "100%",
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "white",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 12,
  },
  members: {
    color: "#C9B0FF",
    marginTop: 2,
    fontSize: 14,
    fontWeight: "500",
  },
  description: {
    color: "white",
    fontSize: 14,
    width: 250,
    fontWeight: "500",
    marginTop: 12,
    marginBottom: 16,
  },
  tabbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    width: "100%",
    height: 36,
  },
  tabbarText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  selected: {
    borderBottomWidth: 5,
    borderColor: "#B353FF",
    paddingBottom: 3,
  },
  tabbarTextSelected: {
    fontSize: 18,
    fontWeight: "600",
    textShadowColor: "white",
    color: "#B353FF",
  },
});
