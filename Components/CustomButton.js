import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Icon name="plus" size={25} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    alignContent: "center",
    padding: 80,
    backgroundColor: "#dddddd"
  }
});
