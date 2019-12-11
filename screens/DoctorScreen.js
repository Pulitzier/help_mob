import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Badge, Button } from 'react-native-elements';

export default class DoctorScreen extends Component {
  render() {
    const doctor = this.props.navigation.getParam("doctorProps");
    console.log('here doctor ', doctor);
    return (
      <View>
        <Text>{doctor.fullName}</Text>
        <Text>{doctor.experience}</Text>
        <Text>{doctor.degree}</Text>
        <Text>{doctor.category}</Text>
      </View>
    );
  }
};
