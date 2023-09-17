import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import Checkbox from "expo-checkbox";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { updateChallenge } from "../api/challenges";

const Challenge = ({
  id,
  title,
  description,
  buttonText,
  color,
  isChecked,
}) => {
  const [checked, setChecked] = React.useState(isChecked);
  const onCheck = async () => {
    await updateChallenge({ id: id, completed: !checked });
    setChecked(!checked);
  };
  return (
    <TouchableOpacity onPress={onCheck}>
      <View style={{ ...styles.card, borderWidth: 1.5 }}>
        <View borderStyle="solid" style={{ flexDirection: "row" }}>
          <Text style={{ ...styles.cardTitle }}>{title}</Text>
          <Checkbox
            style={styles.checkbox}
            value={checked}
            onValueChange={onCheck}
          />
        </View>
        <View
          style={{
            marginTop: 5,
            width: "100%",
            borderTopWidth: 1,
            borderTopColor: "white",
          }}
        >
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Challenge;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    height: "100%",
    padding: 20,
    backgroundColor: "#2A0060",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "end",
    padding: 10,
    borderRadius: 15,
  },
  card: {
    // borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#2A0060",
    border: "1.5px solid white",
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    // alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    width: "90%",
    marginLeft: 0,
    fontWeight: "700",
    marginBottom: 10,
    color: "white",
  },
  cardDescription: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
    color: "white",
  },
  cardButton: {
    backgroundColor: "#3498db",
    padding: 10,
    alignItems: "center",
    width: 217,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 18,
  },
  homeIcon: {
    width: 29,
    height: 26,
    flexShrink: 0,
    backgroundColor: "lightgray",
  },
});
