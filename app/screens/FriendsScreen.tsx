import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { View } from '../components/Themed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function FriendsScreen({ navigation } :
{ navigation: NativeStackNavigationProp<ParamListBase> }) {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Friends" />
        <Appbar.Action
          icon="account-plus"
          onPress={() => navigation.navigate('AddFriends')}
        />
      </Appbar.Header>
      <View style={styles.container} />
    </>
  );
}
