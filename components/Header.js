import React from 'react';
import { Header } from 'react-native-elements';
import { StyleSheet } from "react-native";

const HeaderWrapper = () => {
  return (
    <Header
      containerStyle={styles.header}
      placement="right"
      leftComponent={{ text: 'test', style: { color: '#fff' } }}
      centerComponent={{ icon: 'search', color: '#fff' }}
    />
  )
};

export default HeaderWrapper;

const styles = StyleSheet.create({
  header: {
    height: 80,
    alignItems: 'center',
  }
});
