import React from "react";
import { ScrollView, StyleSheet, Text, Modal } from "react-native";
import CustomButton from "./CustomButton";
import TypeSelector from "./TypeSelector";

export default class NewLection extends React.Component {
  state = { items: [], showModal: false };
  static navigationOptions = {
    title: "New Lection"
  };

  toggleModal = () =>
    this.setState(prevState => ({ showModal: !prevState.showModal }));

  addItem = () => {
    this.setState(prevState => {
      const { items } = prevState;
      items.push("item");
      return { ...prevState, items };
    });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.state.items &&
          this.state.items.map(item => (
            <Text style={styles.item} key={item}>
              {item}
            </Text>
          ))}
        <CustomButton onPress={this.toggleModal} />

        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}>
          <TypeSelector closeModal={this.toggleModal} />
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { paddingTop: 20 },
  item: { alignSelf: "center", marginBottom: 10 }
});
