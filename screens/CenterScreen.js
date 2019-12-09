import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { doctors } from '../constants/mock';

export default class CenterScreen extends Component {
  handleChooseDoctor = (doctor) => {
    console.log(doctor);
    this.props.navigation.navigate(
      'Doctor',
      { doctorProps: doctor }
    );
  }

  getDegree = (doctor) => (doctor.degree.length !== 0) ? doctor.degree : "Не указано";

  render() {
    const medCenter = this.props.navigation.getParam("itemProps");
    console.log(medCenter);
    return (
      <View>
        <Text>{medCenter.title}</Text>
        <Text>{medCenter.adress}</Text>
        <Text>{medCenter.workingHours}</Text>
        <Text>{medCenter.type}</Text>
        <ScrollView horizontal={true}>
          {
            medCenter.filters.length
            && medCenter.filters.map((filter) => (
                <Text style={styles.filterStyles} key={filter}>{filter}</Text>
              )
            )
          }
        </ScrollView>
        <ScrollView>
          {
            doctors.map((doctor) => (
              <TouchableOpacity
                onPress={() => this.handleChooseDoctor(doctor)}
                key={doctor.fullName}
                style={styles.buttonStyle}
              >
                <View style={styles.doctorCardStyles} key={doctor.fullName}>
                  <Text style={styles.titleStyles}>{doctor.fullName}</Text>
                  <Text>Стаж работы: {doctor.experience}</Text>
                  <Text>Ученая степень: {this.getDegree(doctor)}</Text>
                  <Text>Категория: {doctor.category}</Text>
                </View>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  filterStyles: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    color: "#fff",
  },
  doctorCardStyles: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'gray',
  },
  titleStyles: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonStyle: {
    marginVertical: 0,
    marginHorizontal: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 0,
    backgroundColor: 'transparent'
  }
});
