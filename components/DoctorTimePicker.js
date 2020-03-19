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
          <Icon name="clock-o" size={25} color="blue" style={styles.timeIcon}/>
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
  },
  timeIcon: {
    paddingRight: 15
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
  },
  timeBoard: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginVertical: 10,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
  },
  timeBoardText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "600"
  },
});
