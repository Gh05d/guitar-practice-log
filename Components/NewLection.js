import React from "react";
import {
  ScrollView,
  StyleSheet,
  Button,
  View,
  Modal,
  Text,
  TextInput,
  ImageBackground
} from "react-native";
import CustomButton from "./CustomButton";
import TypeSelector from "./TypeSelector";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

export default class NewLection extends React.Component {
  state = { name: "", notes: "", items: [], showModal: false };
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("lectionTitle", "New Lection")
  });

  toggleModal = () =>
    this.setState(prevState => ({ showModal: !prevState.showModal }));

  addItem = item => {
    this.setState(prevState => {
      const { items } = prevState;
      items.push(item);
      return { ...prevState, items };
    });
  };

  handleChange = value => {
    this.setState({ name: value });
    this.props.navigation.setParams({ lectionTitle: value });
  };

  saveLection = async () => {
    try {
      const { name, notes, items } = this.state;
      const lection = { name, notes, items };
      let lections = [];
      const prevLections = await AsyncStorage.getItem("lections");

      if (prevLections !== null) {
        const parsedLections = JSON.parse(prevLections);

        lections = [...parsedLections];
      }

      lections.push(lection);
      await AsyncStorage.setItem("lections", JSON.stringify(lections));
      this.props.navigation.navigate("Home");
    } catch (e) {
      console.error(e);
    }
  };

  renderItems = items =>
    items.map(item => {
      let icon = "file-pdf";
      let extraStyle = {};
      let type = "Pdf";

      if (item.type == "tab") {
        icon = "music";
        type = "Songtab";
        extraStyle.backgroundColor = "skyblue";
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
        <TextInput
          style={{ alignSelf: "center" }}
          value={this.state.name}
          placeholder="Name the Lection"
          maxLength={40}
          autoFocus={true}
          onChangeText={this.handleChange}
        />
        {this.state.items && this.renderItems(this.state.items)}
        <CustomButton onPress={this.toggleModal} />

        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}>
          <TypeSelector saveItem={this.addItem} closeModal={this.toggleModal} />
        </Modal>

        <TextInput
          editable={true}
          multiline={true}
          placeholder="Notes..."
          numberOfLines={4}
          onChangeText={text => this.setState({ notes: text })}
          value={this.state.notes}
        />

        {this.state.items.length > 0 && (
          <Button
            disabled={this.state.items.length == 0}
            onPress={this.saveLection}
            title="Save Lection"
          />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { padding: 20, justifyContent: "space-between" },
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
  text: { color: "#FFF" },
  videoPic: { width: "100%", alignSelf: "stretch" }
});
