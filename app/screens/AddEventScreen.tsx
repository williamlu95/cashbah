import { StyleSheet } from 'react-native';
import React from 'react';
import { View } from '../components/Themed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  input: {
    margin: 20,
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default function AddEventScreen() {
  return (
    <View style={styles.container} />
  );
}
