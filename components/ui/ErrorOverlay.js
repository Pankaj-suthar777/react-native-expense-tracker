import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from '../../constants/styles';

const ErrorOverlay = ({message}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default ErrorOverlay;
