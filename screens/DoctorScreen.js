import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { Avatar, Badge, Button } from 'react-native-elements';
import moment from 'moment';
import Header from "../components/Header";
import DoctorsCalendar from '../components/DoctorsCalendar';
import DoctorTimePicker from '../components/DoctorTimePicker';

const DoctorScreen = (props) => {
  const [ time, setTime ] = useState(null);
  const [ date, setDate ] = useState(null);

  const doctor = props.navigation.getParam("doctor");

  return (
    <View>
      <Header/>
      <View style={styles.doctorCardStyles}>
        <Text>{doctor.fullName}</Text>
        <Text>Стаж работы: {doctor.experience}</Text>
        <Text>Степень: {doctor.degree}</Text>
        <Text>Категория: {doctor.category}</Text>
      </View>
      <DoctorsCalendar setDate={setDate}/>
      <DoctorTimePicker setTime={setTime}/>
      <Button title='Save Data'/>
    </View>
  );
};

export default DoctorScreen;

const styles = StyleSheet.create({
  doctorCardStyles: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    maxHeight: 320,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  doctorButtonStyles: {
    color: 'blue',
    borderRadius: 5,
    margin: 10,
  }
});
