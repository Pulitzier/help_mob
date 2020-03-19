import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { StyleSheet, Dimensions } from "react-native";
import throttle from 'lodash/throttle';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');


const SearchWrapper = (props) => {
  const [ searchValue, updateSearch ] = useState('');

  const handleChangeSearch = async (str) => {
    await updateSearch(str);
    await props.searchCenters(str);
  }

  if (!props.showSearch) return null;

  return (
    <SearchBar
      round
      lightTheme
      placeholderTextColor={"#fff"}
      cancelIcon={{style: {color: "#fff"}}}
      searchIcon={false}
      containerStyle={styles.containerStyle}
      inputContainerStyle={styles.inputContainerStyle}
      inputStyle={styles.inputStyle}
      cancelIcon={<Icon name="remove" size={15} color="#fff" style={{ display: 'flex' }} />}
      placeholder="Type Here..."
      onChangeText={handleChangeSearch}
      value={searchValue}
      onCancel={props.handlePress}
      onClear={() => handleChangeSearch("")}
    />
  );
}

export default SearchWrapper;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#3265dc',
  },
  inputContainerStyle: {
    backgroundColor: '#2189DC',
  },
  inputStyle: {
    backgroundColor: '#2189DC',
    color: '#fff'
  }
});
