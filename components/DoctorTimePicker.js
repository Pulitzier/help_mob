import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import TimePicker from "react-native-24h-timepicker";
import Icon from "react-native-vector-icons/FontAwesome";

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
    return (
      <View style={styles.container}>
        <View style={styles.timeBoardWrapper}>
          <TouchableOpacity
            onPress={() => this.TimePicker.open()}
            style={styles.timeBoard}
          >
            <Text style={styles.timeBoardText}>{this.state.time}</Text>
          </TouchableOpacity>
        </View>
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
  timeBoardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'blue',
    borderRadius: 100,
    borderWidth: 2,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: 70,
    height: 70,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
  },
  timeBoard: {
    backgroundColor: "#fff",
    padding: 0,
    margin: 0,
    justifyContent: 'center',
  },
  timeBoardText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "600"
  },
});
