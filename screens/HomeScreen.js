import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from "../components/Header";

const { width, height } = Dimensions.get('window');

const centersUrl = 'https://rjjt56u7fb.execute-api.eu-central-1.amazonaws.com/stage/center';

export default class HomeScreen extends Component {
  state = {
    centersIsReady: false,
    allMedCentrs: null,
    medCentrs: null,
  };

  componentDidMount() {
    this.getCenters();
  }

  handleChooseCenter = (item) => {
    this.props.navigation.navigate(
      'Center',
      { center: item }
    );
  };

  getCenters = async () => {
    const params = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    try {
      let response = await fetch(centersUrl, params);
      let responseJson = await response.json();
      if (responseJson.centers) this.setState({ centersIsReady: true, allMedCentrs: responseJson.centers });
      return responseJson.centers;
    } catch (error) {
      console.error(error);
      this.setState({ error });
      return null;
    }
  }

  handleSearch = async (query) => {
    const str = query.toLowerCase();
    const filtration = (item) =>  item.title && item.title.toLowerCase().includes(str);
    console.log(query);
    this.setState({ medCentrs: this.state.allMedCentrs.filter(filtration) });
  }

  renderCenters = (all, med) => {
    let centers = all;
    if (med && Array.isArray(med)) centers = med;
    if (!centers || !Array.isArray(centers)) return null;
    return centers.map((item) => (
      <TouchableOpacity
        onPress={() => this.handleChooseCenter(item)}
        key={item.title}
        style={styles.buttonStyle}
      >
        <View style={styles.centrCardStyles} key={item.title}>
          <Text style={styles.titleStyles}>{item.title}</Text>
          <Text style={styles.centerType}>{item.type}</Text>
          <Text>
            <Icon name="map-marker" size={15} color="blue" style={{ display: 'flex' }}/> {item.address}
          </Text>
          <Text><Icon name="clock-o" size={15} color="blue"/> {item.workingHours}</Text>
        </View>
      </TouchableOpacity>
    ));
  }

  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <ScrollView>
          {
            !this.state.centersIsReady &&
            <View style={styles.shadow}>
              <ActivityIndicator size="large" color="#0000ff"/>
            </View>
          }
          {
            this.renderCenters(allMedCentrs, medCentrs)
          }
        </ScrollView>
      </View>
    );
  }
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

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
    backgroundColor: '#fff',
  },
  centrCardStyles: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'gray',
  },
  titleStyles: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  centerType: {
    color: "#ae020b"
  },
  buttonStyle: {
    marginVertical: 0,
    marginHorizontal: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 0,
    backgroundColor: 'transparent'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
