import React, { useState } from 'react';
import { Header } from 'react-native-elements';
import throttle from 'lodash/throttle';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions
} from "react-native";
import SearchWrapper from './Search';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const SearchIcon = (props) => {
  return (
    <TouchableOpacity
      onPress={props.handlePress}
      style={styles.searchIcon}
    >
      <Text>
        <Icon name="search" size={15} color="#fff" style={{ display: 'flex' }} />
      </Text>
    </TouchableOpacity>
  )
};

const HeaderWrapper = (props) => {
  const [shouldShowSearch, setShowSearchFlag] = useState(false);
  let right = (<SearchIcon handlePress={() => setShowSearchFlag(!shouldShowSearch)} />);
  if (!props.searchCenters) right = null;
  return (
    <View>
      <Header
        containerStyle={styles.header}
        placement="right"
        leftComponent={{ text: 'InCe', style: { color: '#fff' } }}
        rightComponent={right}
      />
      <SearchWrapper
        showSearch={shouldShowSearch}
        handlePress={() => setShowSearchFlag(false)}
        searchCenters={props.searchCenters}
      />
    </View>
  )
};

export default HeaderWrapper;

const styles = StyleSheet.create({
  header: {
    height: 80,
  },
  searchIcon: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
