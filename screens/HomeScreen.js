import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { medCentrs } from '../constants/mock';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from "../components/Header";

export default class HomeScreen extends Component {
  handleChooseCenter = (item) => {
    this.props.navigation.navigate(
      'Center',
      { center: item }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <ScrollView>
          {
            medCentrs.map((item) => (
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
            ))
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
