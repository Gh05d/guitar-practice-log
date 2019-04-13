import { createStackNavigator, createAppContainer } from "react-navigation";
import Practice from "./Practice";
import HomeScreen from "./Home";
import Lections from "./Lections";
import NewLection from "./NewLection";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Practice: { screen: Practice },
    Lections: { screen: Lections },
    NewLection: { screen: NewLection }
  },
  {
    initialRouteName: "NewLection",
    defaultNavigationOptions: {
      headerStyle: { backgroundColor: "#f4511e" }
    }
  }
);

const App = createAppContainer(MainNavigator);

export default App;
