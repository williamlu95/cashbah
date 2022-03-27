import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Text } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import FriendsScreen from '../screens/FriendsScreen';

export default function BottomNavigator({ navigation }:
{ navigation: NativeStackNavigationProp<ParamListBase> }) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'friends', title: 'Friends', icon: 'account-group' },
    { key: 'expenses', title: 'Expenses', icon: 'receipt' },
    { key: 'events', title: 'Events', icon: 'calendar-month' }]);

  const renderScene = BottomNavigation.SceneMap({
    friends: () => <FriendsScreen navigation={navigation} />,
    expenses: () => <Text>Expenses</Text>,
    events: () => <Text>Events</Text>,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
