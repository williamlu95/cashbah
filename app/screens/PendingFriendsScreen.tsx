import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  List, Divider, Avatar, TouchableRipple,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { View } from '../components/Themed';
import {
  acceptRequest, deleteRequest, getPendingRequests, RelatedUser,
} from '../apis/user-relationships';
import { showErrorToast } from '../components/Toast';

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

export default function PendingFriendsScreen() {
  const navigation = useNavigation();
  const [pendingRequests, setPendingRequests] = useState<RelatedUser[]>([]);

  const fetchPendingRequests = async () => {
    const requests = await getPendingRequests();
    setPendingRequests(requests);

    if (!requests.length) {
      navigation.goBack();
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const handleConfirmPress = (id: string) => async () => {
    try {
      await acceptRequest(id);
      await fetchPendingRequests();
    } catch (err) {
      console.error(err);
      showErrorToast('Request failed please try again.');
    }
  };

  const handleCancelPress = (id: string) => async () => {
    try {
      await deleteRequest(id);
      await fetchPendingRequests();
    } catch (err) {
      console.error(err);
      showErrorToast('Request failed please try again.');
    }
  };

  const renderUserButton = (color: string, id: string) => (
    <>
      <TouchableRipple onPress={handleConfirmPress(id)}>
        <List.Icon color={color} icon="check-circle-outline" />
      </TouchableRipple>
      <TouchableRipple onPress={handleCancelPress(id)}>
        <List.Icon color={color} icon="close-circle-outline" />
      </TouchableRipple>
    </>
  );

  const renderUserList = () => pendingRequests.map(({ id, name }) => (
    <React.Fragment key={id}>
      <View>
        <List.Item
          title={name}
          left={() => (
            <Avatar.Image source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
            />
          )}
          right={({ color }) => renderUserButton(color, id)}
        />
      </View>
      <Divider />
    </React.Fragment>
  ));

  return (
    <View style={styles.container}>
      <Divider />
      {renderUserList()}
    </View>
  );
}
