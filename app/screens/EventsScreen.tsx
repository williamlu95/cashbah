import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function EventsScreen({ navigation } :
{ navigation: NativeStackNavigationProp<ParamListBase> }) {
  const renderAppbar = () => (
    <Appbar.Header>
      <Appbar.Content title="Events" />
      <Appbar.Action
        icon="calendar-plus"
        onPress={() => navigation.navigate('AddEvent')}
      />
    </Appbar.Header>
  );

  return (
    <>
      {renderAppbar()}
      <View style={styles.container} />
    </>
  );
}
