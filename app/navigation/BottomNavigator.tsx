import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import ExpensesScreen from '../screens/ExpensesScreen';
import FriendsScreen from '../screens/FriendsScreen';
import EventsScreen from '../screens/EventsScreen';

export default function BottomNavigator({ navigation }:
{ navigation: NativeStackNavigationProp<ParamListBase> }) {
  const [index, setIndex] = useState(1);
  const [routes] = useState([
    { key: 'friends', title: 'Friends', icon: 'account-group' },
    { key: 'expenses', title: 'Expenses', icon: 'receipt' },
    { key: 'events', title: 'Events', icon: 'calendar-month' }]);

  const renderScene = BottomNavigation.SceneMap({
    friends: () => <FriendsScreen navigation={navigation} />,
    expenses: () => <ExpensesScreen navigation={navigation} />,
    events: () => <EventsScreen navigation={navigation} />,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
