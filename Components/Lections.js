import React from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";

export default class Lections extends React.Component {
  static navigationOptions = {
    title: "Lections"
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            { key: "Lection 1" },
            { key: "Lection 2" },
            { key: "Lection 3" },
            { key: "Lection 4" },
            { key: "Lection 5" },
            { key: "Lection 6" },
            { key: "Lection 7" },
            { key: "Lection 8" },
            { key: "Lection 9" },
            { key: "Lection 11" },
            { key: "Lection 12" },
            { key: "Lection 13" },
            { key: "Lection 14" },
            { key: "Lection 15" },
            { key: "Lection 16" },
            { key: "Lection 17" },
            { key: "Lection 18" },
            { key: "Lection 19" },
            { key: "Lection 21" },
            { key: "Lection 22" },
            { key: "Lection 23" },
            { key: "Lection 24" },
            { key: "Lection 25" },
            { key: "Lection 26" },
            { key: "Lection 27" },
            { key: "Lection 28" },
            { key: "Lection 29" }
          ]}
          renderItem={({ item }) => (
            <View style={styles.lectionButton}>
              <Button
                title={item.key}
                color="blueviolet"
                onPress={() => console.warn(this.props)}
              />
            </View>
          )}
          contentContainerStyle={styles.lections}
        />
        <View style={styles.newButton}>
          <Button
            title="+"
            color="crimson"
            onPress={() => console.warn("Create new lection")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    justifyContent: "space-between"
  },
  lections: {
    justifyContent: "space-between",
    alignItems: "center"
  },
  lectionButton: {
    marginBottom: 20
  },
  newButton: {
    position: "absolute",
    width: 50,
    height: 50,
    bottom: 10,
    right: 20
  }
});
