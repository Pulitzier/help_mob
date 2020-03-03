import React, { useState } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import Header from "../components/Header";
import DoctorsCalendar from '../components/DoctorsCalendar';
import DoctorTimePicker from '../components/DoctorTimePicker';

const bUrl = 'https://rjjt56u7fb.execute-api.eu-central-1.amazonaws.com/stage/save';

const saveObj = async (obj) => {
  const user = JSON.parse(await AsyncStorage.getItem('@user'));
  const jsonObj = {
    ...obj,
    user,
  };
  let objectKey = 'default';
  if (user.fullName) {
    objectKey = user.fullName.split(' ').join('_');
  } else if (user.phone) {
    objectKey = user.phone;
  }

  const event = {
    objectKey,
    jsonObj,
  };

  const params = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ params: event }),
  };
  try {
    let response = await fetch(bUrl, params);
    let responseJson = await response.json();
    console.log(responseJson);
  } catch (error) {
    console.error(error);
  }
  return null;
};

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
            <Button
              title='Save Data'
              onPress={() => saveObj({ time, date, doctor })}
            />
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
