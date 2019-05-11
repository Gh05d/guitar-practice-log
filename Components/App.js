import { createStackNavigator, createAppContainer } from "react-navigation";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Practice from "./Practice";
import HomeScreen from "./Home";
import Lections from "./Lections";
import Lection from "./Lection";
import NewLection from "./NewLection";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Practice: { screen: Practice },
    Lections: { screen: Lections },
    NewLection: { screen: NewLection },
    Lection: {
      screen: Lection,
      path: "lection/:name",
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.name}`
      })
    }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: "#f4511e" }
    },
    defaultNavigationOptions: {
      headerRight: <Icon style={{ marginRight: 15 }} name="music" size={25} />,
      headerStyle: {
        backgroundColor: "orangered"
      }
    }
  }
);

const App = createAppContainer(MainNavigator);

export default App;
