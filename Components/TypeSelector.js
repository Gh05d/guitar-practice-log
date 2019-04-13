import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import MusicSearch from "./MusicSearch";

export default class TypeSelector extends React.Component {
  state = { type: "", song: "" };

  renderType = type => {
    switch (type) {
      case "Youtube":
        return <Text>{this.state.type}</Text>;

      case "Pdf":
        return <Text>{this.state.type}</Text>;

      case "Songsterr":
        return <MusicSearch />;
    }
  };

  render() {
    const types = ["Youtube", "Pdf", "Songsterr"];

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Select a Type</Text>
        {this.state.type ? (
          this.renderType(this.state.type)
        ) : (
          <View style={styles.items}>
            {types.map(type => (
              <Button
                color="burlywood"
                key={type}
                title={type}
                onPress={() => this.setState({ type })}
              />
            ))}
          </View>
        )}

        <View style={styles.cancel}>
          <Button
            color="crimson"
            title="Cancel"
            onPress={this.props.closeModal}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { margin: 10, flex: 1, alignItems: "center" },
  header: { fontSize: 20 },
  items: { flex: 2, justifyContent: "space-around" },
  cancel: { marginTop: 10 }
});
