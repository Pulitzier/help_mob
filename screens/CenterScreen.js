import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { doctors } from '../constants/mock';
import Header from "../components/Header";

export default class CenterScreen extends Component {
  state = {
    type: 'All'
  }

  handleChooseDoctor = (doctor) => {
    this.props.navigation.navigate(
      'Doctor',
      { doctorProps: doctor }
    );
  }

  filter = (type) => this.setState({ type });

  getDegree = (doctor) => (doctor.degree.length !== 0) ? doctor.degree : "Не указано";

  render() {
    const medCenter = this.props.navigation.getParam("itemProps");
    const { type } = this.state;
    return (
      <View>
        <Header />
        <View style={styles.centrCardStyles}>
          <Text>{medCenter.title}</Text>
          <Text style={styles.centrType}>{medCenter.type}</Text>
          <Text><Icon name="map-marker" size={15} color="blue" style={{ display: 'flex' }}/> {medCenter.adress}</Text>
          <Text><Icon name="clock-o" size={15} color="blue"/> {medCenter.workingHours}</Text>
        </View>
        <ScrollView horizontal={true} style={styles.horizontalScroll}>
          <TouchableOpacity onPress={() => this.filter('All')} style={styles.filterStyles}>
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          {
            medCenter.filters.length &&
            medCenter.filters.map(type => (
                <TouchableOpacity onPress={() => this.filter(type)} key={type} style={styles.filterStyles}>
                  <Text key={type} style={styles.filterText}>{type}</Text>
                </TouchableOpacity>
              )
            )
          }
        </ScrollView>
        <ScrollView style={styles.doctorsListContainer}>
          <View>
            {
              doctors
                .filter(doc => {
                  if (type === 'All') return true;
                  return doc.profArea.includes(type);
                })
                .map(doctor => (
                  <TouchableOpacity
                    onPress={() => this.handleChooseDoctor(doctor)}
                    key={doctor.fullName}
                    style={styles.doctorCardWrapper}
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
          </View>
        </ScrollView>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  centrCardStyles: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    maxHeight: 320,
  },
  horizontalScroll: {
    paddingBottom: 10,
  },
  filterStyles: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    alignContent: 'center',
  },
  filterText: {
    color: '#fff',
    top: -3,
  },
  centrType: {
    color: '#ae020b',
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
  doctorsListContainer: {
    flexGrow: 1,
    bottom: 0,
  },
  doctorCardWrapper: {
    marginVertical: 0,
    marginHorizontal: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 0,
    backgroundColor: 'transparent'
  }
});
