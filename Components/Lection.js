import React from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";

export default class Lection extends React.Component {
  render() {
    return <Text>{this.props.navigation.getParam("name")}</Text>;
  }
}
