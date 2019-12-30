import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Badge, Button } from 'react-native-elements';
import moment from 'moment';
import Header from "../components/Header";
import DoctorsCalendar from '../components/DoctorsCalendar';

export default class DoctorScreen extends Component {
  render() {
    const doctor = this.props.navigation.getParam("doctorProps");
    return (
      <View>
        <Header />
        <View style={styles.doctorCardStyles}>
          <Text>{doctor.fullName}</Text>
          <Text>Стаж работы: {doctor.experience}</Text>
          <Text>Степень: {doctor.degree}</Text>
          <Text>Категория: {doctor.category}</Text>
        </View>
        <DoctorsCalendar />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  doctorCardStyles: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    maxHeight: 320,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: 'gray',
  }
});
