import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from "../components/Header";
import DoctorScreenSection from '../components/DoctorScreenSection';

const { width, height } = Dimensions.get('window');

const filtersUrl = 'https://rjjt56u7fb.execute-api.eu-central-1.amazonaws.com/stage/filter';
const doctorsUrl = 'https://rjjt56u7fb.execute-api.eu-central-1.amazonaws.com/stage/doc';

const toastMessage = "К сожалению, нам не удалось найти мед.персонал.\nВыберите время, и наш оператор свяжется с Вами!";

export default class CenterScreen extends Component {
  state = {
    type: 'All',
    filters: null,
    doctors: null,
    fetchedDoctors: false,
    shouldToastBeVisible: false,
  };

  handleChooseDoctor = (item) => {
    this.props.navigation.navigate(
      'Doctor',
      { doctor: item }
    );
  };

  componentDidMount() {
    this.getCenterParams();
    this.setState({ shouldToastBeVisible: true })
  }

  componentWillUnmount() {
    this.setState({
      type: 'All',
      filters: null,
      doctors: null,
      fetchedDoctors: false,
      shouldToastBeVisible: false,
    })
  }

  getCenterParams = async () => {
    const medCenter = this.props.navigation.getParam("center");
    const doctors = await this.getDoctors(medCenter.id);
    if (doctors) this.setState({ doctors, fetchedDoctors: true });
    else this.setState({ fetchedDoctors: true })
    await this.getFilters();
  }

  filter = (type) => this.setState({ type });

  getDoctors = async (id) => {
    const params = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    };
    try {
      let response = await fetch(doctorsUrl, params);
      let responseJson = await response.json();
      return responseJson.doctors;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  formatProfArea = (items) => {
    let str = '';
    if (items.length === 1) {
      str = items[0][0].toUpperCase() + items[0].slice(1);
    }
    else {
      str = items.map((item) => item[0].toUpperCase() + item.slice(1)).join(', ');
    }
    return str;
  }

  getFilters = async () => {
    const params = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    try {
      let response = await fetch(filtersUrl, params);
      let responseJson = await response.json();
      if (responseJson.filters) this.setState({ filters: responseJson.filters })
      return responseJson.filters;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  renderChild() {
    const medCenter = this.props.navigation.getParam("center");
    if (this.state.doctors) {
      return (
        <View>
          {
            this.state.doctors
              .map(doctor => (
                <TouchableOpacity
                  onPress={() => this.handleChooseDoctor(doctor)}
                  key={doctor.fullName}
                  style={styles.doctorCardWrapper}
                >
                  <View style={styles.doctorCardStyles} key={doctor.fullName}>
                    <Text style={styles.titleStyles}>{doctor.fullName}</Text>
                    <Text>Стаж работы: {doctor.experience ? doctor.experience : 'не указано'}</Text>
                    {
                      doctor.profArea &&
                      <Text>{this.formatProfArea(doctor.profArea)}</Text>
                    }
                  </View>
                </TouchableOpacity>
              ))
          }
        </View>
      )
    }
    else {
      return <DoctorScreenSection center={medCenter}/>;
    }
  }

  render() {
    const medCenter = this.props.navigation.getParam("center");
    const { type, filters, doctors, fetchedDoctors } = this.state;
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.centrCardStyles}>
          <Text style={styles.centrTitle}>{medCenter.title}</Text>
          {
            doctors &&
            <Text style={styles.centrType}>{medCenter.type}</Text>
          }
          {
            doctors &&
            <Text><Icon name="map-marker" size={15} color="blue" style={{ display: 'flex' }}/> {medCenter.address}</Text>
          }
          <Text><Icon name="clock-o" size={15} color="blue"/> {medCenter.workingHours}</Text>
        </View>
        {
          fetchedDoctors &&
          !doctors &&
          <TouchableOpacity style={styles.toastWrapper}>
            <Text style={{ "justifyContent": 'center' }}><Icon name="exclamation" size={15} color="red"/> {toastMessage}</Text>
          </TouchableOpacity>
        }
        <ScrollView
          horizontal={true}
          style={doctors ? styles.horizontalScroll : { "height": 0 }}
          contentContainerStyle={styles.contentContainer}
        >
          {
            doctors &&
            <TouchableOpacity onPress={() => this.filter('All')} style={styles.filterStyles}>
              <Text style={styles.filterText}>All</Text>
            </TouchableOpacity>
          }
          {
            doctors &&
            !filters &&
            <View style={styles.shadow}>
              <ActivityIndicator size="large" color="#0000ff"/>
            </View>
          }
          {
            doctors &&
            filters &&
            filters.map(type => (
                <TouchableOpacity onPress={() => this.filter(type)} key={type} style={styles.filterStyles}>
                  <Text key={type} style={styles.filterText}>{type}</Text>
                </TouchableOpacity>
              )
            )
          }
        </ScrollView>
        <ScrollView style={styles.doctorsListContainer}>
          {
            !fetchedDoctors ? (
              <View style={styles.shadow}>
                <ActivityIndicator size="large" color="#0000ff"/>
              </View>
            ) : this.renderChild()
          }
        </ScrollView>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  shadow: {
    width,
    height,
    justifyContent: 'center',
    flexDirection: 'row',
    display: 'flex',
    padding: 10
  },
  container: {
    flex: 1,
  },
  centrCardStyles: {
    width,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    maxHeight: 320,
  },
  centrTitle: {
    fontWeight: 'bold',
  },
  toastWrapper: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
  },
  horizontalScroll: {
    height: 50,
  },
  contentContainer: {
    alignItems: 'center',
  },
  filterStyles: {
    backgroundColor: 'gray',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    flex: 1,
    alignContent: 'center',
  },
  filterText: {
    color: '#fff',
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
