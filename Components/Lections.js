import React from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default class Lections extends React.Component {
  state = { lections: null };
  static navigationOptions = {
    title: "Lections"
  };

  componentDidMount = async () => {
    try {
      const lections = await AsyncStorage.getItem("lections");

      if (lections !== null) {
        await this.setState({ lections: JSON.parse(lections) });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  render() {
    if (!this.state.lections) {
      return (
        <View style={styles.container}>
          <Text>You haven't created any Lessons yet</Text>
          <Button
            onPress={() => this.props.navigation.navigate("NewLection")}
            title="Create your first lesson"
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.lections}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <View style={styles.lectionButton}>
              <Button
                title={item.name}
                color="blueviolet"
                onPress={() =>
                  this.props.navigation.navigate("Lection", {
                    name: item.name
                  })
                }
              />
            </View>
          )}
          contentContainerStyle={styles.lections}
        />

        <View style={styles.newButton}>
          <Button
            title="+"
            color="crimson"
            onPress={() => this.props.navigation.navigate("NewLection")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between"
  },
  lections: {
    justifyContent: "space-between",
    alignItems: "center"
  },
  lectionButton: {
    marginBottom: 20,
    width: 200
  },
  newButton: {
    position: "absolute",
    width: 50,
    height: 50,
    bottom: 10,
    right: 20
  }
});
