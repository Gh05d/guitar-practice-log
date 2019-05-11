import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import MusicSearch from "./MusicSearch";
import VideoSearch from "./VideoSearch";

export default class TypeSelector extends React.Component {
  state = { type: null };

  handlePress = () => {
    if (this.state.type) {
      this.setState({ type: null });
    } else {
      this.props.closeModal();
    }
  };

  renderType = type => {
    switch (type) {
      case "Youtube":
        return (
          <VideoSearch
            closeModal={this.props.closeModal}
            setVideo={this.props.saveItem}
          />
        );

      case "Songsterr":
        return (
          <MusicSearch
            closeModal={this.props.closeModal}
            setSong={this.props.saveItem}
          />
        );

      case "Pdf":
        return <Text>{this.state.type}</Text>;
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
            title={this.state.type ? "Back" : "Cancel"}
            onPress={this.handlePress}
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
