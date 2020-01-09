import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Picker,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import TimePicker from "react-native-24h-timepicker";

export default class DoctorTimePicker extends Component {
  constructor() {
    super();
    this.state = {
      time: '00:00',
    };
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
        <TouchableOpacity
          onPress={() => this.TimePicker.open()}
          style={styles.timeBoard}
        >
          <Text style={styles.timeBoardText}>{this.state.time}</Text>
        </TouchableOpacity>
        <TimePicker
          ref={ref => {
            this.TimePicker = ref;
          }}
          onCancel={() => this.onCancel()}
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
    marginVertical: 40,
    justifyContent: 'center',
  },
  timeBoardText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "600"
  },
});
