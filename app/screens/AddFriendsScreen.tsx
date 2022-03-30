import { StyleSheet } from 'react-native';
import React, { useCallback, useState } from 'react';
import {
  Searchbar, List, Divider, Avatar,
} from 'react-native-paper';
import debounce from 'lodash.debounce';
import { View } from '../components/Themed';
import { getUsers } from '../apis/users';
import { createUserRelationship, RELATIONSHIP_TYPE } from '../apis/user-relationships';
import { showErrorToast, showSuccessToast } from '../components/Toast';

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

type User = {
  id: string;
  name: string;
  isRequested: boolean;
};

const DEBOUNCE_TIMEOUT = 300;

export default function AddFriendScreen() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const searchUsers = async (searchText: string) => {
    if (!searchText.trim()) {
      setUsers([]);
      return;
    }

    const results = await getUsers(searchText);
    setUsers(results);
  };

  const handleSearch = useCallback(debounce(searchUsers, DEBOUNCE_TIMEOUT), []);

  const clearSearch = () => {
    handleSearch.cancel();
    setSearch('');
    setUsers([]);
  };

  const handleSearchChange = (text: string) => {
    if (!text) {
      clearSearch();
      return;
    }

    setSearch(text);
    handleSearch(text);
  };

  const handleFriendRequestPress = (id: string) => async () => {
    try {
      await createUserRelationship({ relatedToUserId: id, type: RELATIONSHIP_TYPE.PENDING });
      showSuccessToast('Friend Request Successfully Sent.');
      handleSearch.cancel();
      await searchUsers(search);
    } catch (err) {
      console.error(err);
      showErrorToast('Friend Request Failed. Please try again.');
    }
  };

  const renderRequestIcon = (isRequested: boolean, color: string) => (
    isRequested
      ? <List.Icon color={color} icon="account-clock" />
      : <List.Icon color={color} icon="account-plus" />
  );

  const renderUserList = () => users.map(({ id, name, isRequested }) => (
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
          right={({ color }) => renderRequestIcon(isRequested, color)}
          disabled={isRequested}
          onPress={handleFriendRequestPress(id)}
        />
      </View>
      <Divider />
    </React.Fragment>
  ));

  return (
    <View style={styles.container}>
      <Searchbar
        autoFocus
        autoComplete="name"
        placeholder="Search by email or name"
        style={styles.input}
        value={search}
        onChangeText={handleSearchChange}
      />
      <Divider />
      {renderUserList()}
    </View>
  );
}
