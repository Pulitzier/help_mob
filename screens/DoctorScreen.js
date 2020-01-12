import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Header from "../components/Header";
import DoctorsCalendar from '../components/DoctorsCalendar';
import DoctorTimePicker from '../components/DoctorTimePicker';

const DoctorScreen = (props) => {
  const [ time, setTime ] = useState(null);
  const [ date, setDate ] = useState(null);

  const doctor = props.navigation.getParam("doctor");

  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.doctorCardStyles}>
        <Text>{doctor.fullName}</Text>
        <Text>Стаж работы: {doctor.experience}</Text>
        <Text>Степень: {doctor.degree}</Text>
        <Text>Категория: {doctor.category}</Text>
      </View>
      <View style={styles.subContainer}>
        <DoctorsCalendar setDate={setDate}/>
        <DoctorTimePicker setTime={setTime}/>
        <View style={styles.buttonWrapper}>
          <View style={styles.buttonStyles}>
            <Button title='Save Data'/>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DoctorScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    flex: 1,
  },
  doctorCardStyles: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    maxHeight: 320,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  subContainer: {
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 10,
    width: "100%"
  },
  buttonStyles: {
    color: 'blue',
    borderRadius: 5,
    width: 150,
  }
});
