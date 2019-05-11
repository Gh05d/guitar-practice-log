import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default class Timer extends React.Component {
  state = { time: 300, running: false };

  componentDidMount() {
    if (this.props.duration) {
      this.setState({ time: this.props.duration });
    }
  }

  startTimer = async () => {
    if (this.state.running) {
      clearInterval(this.timer);
      await this.setState({ running: false, time: 300 });
    } else {
      await this.setState({ running: true });
      this.timer = setInterval(this.runTimer, 1000);
    }
  };

  runTimer = async () => {
    await this.setState(prevState => ({
      ...prevState,
      time: prevState.time - 1
    }));

    if (this.state.time <= 0) {
      clearInterval(this.timer);
      this.setState({ running: false });
    }
  };

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.startTimer}>
        <Text style={styles.timer}>{this.state.time}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  timer: {
    backgroundColor: "crimson",
    color: "#fff",
    padding: 80,
    borderRadius: 90,
    alignSelf: "center"
  }
});
