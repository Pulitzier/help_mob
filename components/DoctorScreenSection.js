import React, { useState } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import moment from 'moment';
import Header from "../components/Header";
import DoctorsCalendar from '../components/DoctorsCalendar';
import DoctorTimePicker from '../components/DoctorTimePicker';

const bUrl = 'https://rjjt56u7fb.execute-api.eu-central-1.amazonaws.com/stage/save';

const saveObj = async (obj) => {
  const user = JSON.parse(await AsyncStorage.getItem('@user'))[0];
  console.log(user);
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
    if (!!responseJson.error) throw new Error('Something during saving');
    return responseJson;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const handleClick = async (data) => {
  const response = await saveObj(data);
  let type = null;
  let message = 'Ваш запрос успешно сохранен!';
  if (response.error) {
    type = 'Ошибка!';
    message = response.error.message ? response.error.message : 'Что-то пошло не так';
  }
  Alert.alert(
    type,
    message,
    [
      { text: 'OK', onPress: () => {} },
    ],
    { cancelable: false },
  );
};

const DoctorScreenSection = (props) => {
  const curTime = moment().format('H:MM');
  const curDate = moment().format('YYYY-MM-DD');
  const [ time, setTime ] = useState(curTime);
  const [ date, setDate ] = useState(curDate);

  const data = props.doctor || props.center;

  return (
    <View style={styles.subContainer}>
      <DoctorsCalendar setDate={setDate} curDate={curDate}/>
      <DoctorTimePicker setTime={setTime} curTime={curTime}/>
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonStyles}>
          <Button
            title='Save Data'
            onPress={() => handleClick({ time, date, data })}
          />
        </View>
      </View>
    </View>
  );
};

export default DoctorScreenSection;

const styles = StyleSheet.create({
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
