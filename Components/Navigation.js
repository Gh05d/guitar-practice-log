import React from "react";
import { StyleSheet, Button, View } from "react-native";

export default props => {
  const links = [
    { name: "Practice", destination: "Practice" },
    { name: "Lections", destination: "Lections" },
    { name: "Create New Lection", destination: "NewLection" },
    { name: "Statistics", destination: "Statistics" }
  ];

  return (
    <View style={styles.list}>
      {links.map(link => (
        <Button
          title={link.name}
          color="blueviolet"
          onPress={() => props.navigation.navigate(link.destination)}
          key={link.name}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 2,
    justifyContent: "space-around"
  }
});
