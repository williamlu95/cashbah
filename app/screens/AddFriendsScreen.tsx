import { StyleSheet } from 'react-native';
import { useCallback, useState } from 'react';
import { TextInput, List, Divider } from 'react-native-paper';
import debounce from 'lodash.debounce';
import { View } from '../components/Themed';
import { getUsers } from '../apis/users';

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
    if (!searchText) {
      setUsers([]);
      return;
    }

    const results = await getUsers(search);
    setUsers(results);
  };

  const handleSearch = useCallback(debounce(searchUsers, DEBOUNCE_TIMEOUT), []);

  const handleSearchClearPress = () => {
    setSearch('');
    searchUsers('');
  };

  const handleSearchChange = (text: string) => {
    setSearch(text);
    handleSearch(text);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFriendRequestPress = (id: string) => () => {
    // TODO: add requesting logic
  };

  const renderRequestIcon = (isRequested: boolean, color: string) => (
    isRequested
      ? <List.Icon color={color} icon="account-clock" />
      : <List.Icon color={color} icon="account-plus" />
  );

  const renderUserList = () => users.map(({ id, name, isRequested }) => (
    <>
      <List.Item
        key={id}
        title={name}
        right={({ color }) => renderRequestIcon(isRequested, color)}
        disabled={isRequested}
        style={styles.row}
        onPress={handleFriendRequestPress(id)}
      />
      <Divider />
    </>
  ));

  const renderSearchClearIcon = () => (
    <TextInput.Icon
      name={search ? 'close-circle-outline' : 'magnify'}
      onPress={handleSearchClearPress}
    />
  );

  return (
    <View style={styles.container}>
      <TextInput
        autoFocus
        autoComplete="name"
        label="Search"
        placeholder="Search by email or name"
        style={styles.input}
        value={search}
        onChangeText={handleSearchChange}
        right={renderSearchClearIcon()}
      />
      <Divider />
      {renderUserList()}
    </View>
  );
}
