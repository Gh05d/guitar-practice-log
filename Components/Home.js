import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Navigation from "./Navigation";

export default class Home extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          <Text>Guitar Practice Log</Text>
          <Icon name="music" size={25} />
        </Text>
        <Navigation navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  header: {
    fontSize: 25,
    flex: 1,
    textAlign: "center",
    margin: 10
  }
});
