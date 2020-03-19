import React, { useState } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';
import Header from "../components/Header";
import DoctorScreenSection from '../components/DoctorScreenSection';

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
    return responseJson;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const handleClick = async (data) => {
  const response = await saveObj(data);
  if (response.error) {
    if (response.error.message) {
      Alert.alert(
        'Ошибка!',
        `${response.error.message}`,
        [
          { text: 'OK', onPress: () => {} },
        ],
        { cancelable: false },
      );
    }
    else {
      Alert.alert(
        'Ошибка!',
        'Что-то пошло не так',
        [
          { text: 'OK', onPress: () => {} },
        ],
        { cancelable: false },
      );
    }
  }
  else {
    Alert.alert(
      null,
      'Ваш запрос успешно сохранен!',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        { text: 'OK', onPress: () => {} },
      ],
      { cancelable: false },
    );
  }
};

const formatProfArea = (items) => {
  let str = '';
  if (items.length === 1) str = items[0][0].toUpperCase() + items[0].slice(1);
  else str = items.map((item) => item[0].toUpperCase() + item.slice(1)).join(', ');
  return str;
}

const DoctorScreen = (props) => {
  const curTime = moment().format('HH:MM');
  const curDate = moment().format('YYYY-MM-DD');
  const [ time, setTime ] = useState(curTime);
  const [ date, setDate ] = useState(curDate);


  const doctor = props.navigation.getParam("doctor");
  console.log(formatProfArea(doctor.profArea), doctor);

  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.doctorCardStyles}>
        <Text style={styles.doctorFullName}>{doctor.fullName}</Text>
        {
          doctor.profArea &&
          <Text>{formatProfArea(doctor.profArea)}</Text>
        }
        {
          !!doctor.experience &&
          <Text>Стаж работы: {doctor.experience}</Text>
        }
        {
          !!doctor.degree &&
          <Text>Степень: {doctor.degree}</Text>
        }
        {
          !!doctor.category &&
          <Text>Категория: {doctor.category}</Text>
        }
      </View>
      <DoctorScreenSection doctor={doctor} />
    </View>
  );
};

export default DoctorScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    flex: 1,
  },
  doctorFullName: {
    fontWeight: 'bold',
  },
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
