import { StyleSheet, View } from 'react-native';
import {
  Appbar, Avatar, Badge, Divider, List,
} from 'react-native-paper';
import { ParamListBase, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import React, { useCallback, useEffect, useState } from 'react';
import {
  getPendingRequests, getRelatedUsers, RelatedUser, RELATIONSHIP_TYPE,
} from '../apis/user-relationships';

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

export default function FriendsScreen({ navigation } :
{ navigation: NativeStackNavigationProp<ParamListBase> }) {
  const [pendingCount, setPendingCount] = useState(0);
  const [friends, setFriends] = useState<RelatedUser[]>([]);

  const fetchUsers = async () => {
    const [users, pendingRequests] = await Promise.all([
      getRelatedUsers(),
      getPendingRequests(),
    ]);

    setPendingCount(pendingRequests.length);
    setFriends(users.filter(({ type }) => type === RELATIONSHIP_TYPE.ACTIVE));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useFocusEffect(useCallback(() => {
    fetchUsers();
  }, []));

  const renderAppbar = () => (
    <Appbar.Header>
      <Appbar.Content title="Friends" />
      <Appbar.Action
        icon="account-plus"
        onPress={() => navigation.navigate('AddFriends')}
      />
    </Appbar.Header>
  );

  const renderPendingRequests = () => (pendingCount
    ? (
      <List.Item
        title="Pending Requests"
        left={(props) => (
          <>
            <List.Icon {...props} icon="account" />
            <Badge style={{ position: 'absolute', top: 0, left: 22 }}>{pendingCount}</Badge>
          </>
        )}
        right={(props) => (
          <List.Icon {...props} icon="chevron-right" />
        )}
        onPress={() => navigation.navigate('PendingRequests')}
      />
    ) : null
  );

  const renderUserList = () => friends.map(({ id, name }) => (
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
          right={(props) => (
            <List.Icon {...props} style={{ alignSelf: 'center' }} icon="dots-vertical" />
          )}
        />
      </View>
      <Divider />
    </React.Fragment>
  ));

  return (
    <>
      {renderAppbar()}
      <View style={styles.container}>
        {renderPendingRequests()}
        <Divider />
        {renderUserList()}
      </View>
    </>
  );
}
