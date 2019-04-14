import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Modal,
  Text,
  ImageBackground
} from "react-native";
import CustomButton from "./CustomButton";
import TypeSelector from "./TypeSelector";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

export default class NewLection extends React.Component {
  state = { items: [], showModal: false };
  static navigationOptions = {
    title: "New Lection"
  };

  toggleModal = () =>
    this.setState(prevState => ({ showModal: !prevState.showModal }));

  addItem = item => {
    this.setState(prevState => {
      const { items } = prevState;
      items.push(item);
      return { ...prevState, items };
    });
  };

  renderItems = items =>
    items.map(item => {
      let icon = "file-pdf";
      let extraStyle = {};
      let type = "Pdf";

      if (item.type == "tab") {
        icon = "music";
        type = "Songtab";
        extraStyle.backgroundColor = "lightblue";
      } else if (item.type == "youtube") {
        icon = "youtube";
        type = "Youtube";
        extraStyle.backgroundColor = "lightcoral";
      }

      return (
        <View
          style={{ ...styles.itemContainer, ...extraStyle }}
          key={item.title}>
          <View style={styles.itemTitle}>
            <Icon name={icon} size={25} />
            <Text> {type}</Text>
          </View>
          <Text>{item.title}</Text>

          {item.data && item.data.uri && (
            <ImageBackground
              source={{ uri: item.data.uri }}
              style={{ ...styles.videoPic, height: item.data.height }}
            />
          )}
        </View>
      );
    });

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.state.items && this.renderItems(this.state.items)}

        <CustomButton onPress={this.toggleModal} />

        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}>
          <TypeSelector saveItem={this.addItem} closeModal={this.toggleModal} />
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  itemContainer: {
    width: "90%",
    marginBottom: 20,
    backgroundColor: "lightgreen",
    padding: 30,
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 1
  },
  itemTitle: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  videoPic: { width: "100%", alignSelf: "stretch" }
});
