import React from "react";
import { Text, View } from "react-native";

class Practice extends React.Component {
  static navigationOptions = {
    title: "Practice"
  };

  render() {
    return (
      <View>
        <Text>Practice</Text>
      </View>
    );
  }
}
//  this.props.navigation.setParams({ lectionTitle: lections.name });

export default Practice;
