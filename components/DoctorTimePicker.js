import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import TimePicker from "react-native-24h-timepicker";

export default class DoctorTimePicker extends Component {
  constructor() {
    super();
    this.state = {
      time: ''
    };
  }

  componentDidMount() {
    this.setState({
      time: this.props.curTime.toString(),
    })
  }

  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    this.props.setTime(`${hour}:${minute}`);
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.TimePicker.open()}
          style={styles.timeBoard}
        >
          <Text style={styles.timeBoardText}>{this.state.time}</Text>
        </TouchableOpacity>
        <TimePicker
          ref={ref => this.TimePicker = ref}
          onCancel={() => this.onCancel()}
          selectedHour={this.state.time.split(':')[0]}
          selectedMinute={this.state.time.split(':')[1]}
          onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
  },
  timeBoard: {
    backgroundColor: "#fff",
    borderColor: "gray",
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginVertical: 10,
    justifyContent: 'center',
  },
  timeBoardText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "600"
  },
});
