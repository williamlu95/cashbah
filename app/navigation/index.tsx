import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { useRecoilValue } from 'recoil';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

import AddFriendsScreen from '../screens/AddFriendsScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { userAccessTokenState } from '../atoms/user';
import HeaderBar from './HeaderBar';
import BottomNavigator from './BottomNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const accessToken = useRecoilValue(userAccessTokenState);
  const renderProtectedScreens = () => (accessToken ? (
    <Stack.Navigator
      initialRouteName="Root"
      screenOptions={{
        header: (props) => <HeaderBar {...props} />,
      }}
    >
      <Stack.Screen name="Root" component={BottomNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="AddFriends" component={AddFriendsScreen} options={{ title: 'Add Friends' }} />
      </Stack.Group>
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  ));

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >

      {renderProtectedScreens()}
    </NavigationContainer>
  );
}
