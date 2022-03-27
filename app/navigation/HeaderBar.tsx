import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Appbar } from 'react-native-paper';

export default function HeaderBar({
  navigation, back, route, options,
}: NativeStackHeaderProps) {
  const renderFriendsPageButton = () => (
    <Appbar.Action
      icon="account-plus"
      onPress={() => navigation.navigate('AddFriends')}
    />
  );

  const renderPageSpecificButtons = () => {
    switch (route.name) {
      case 'Friends':
        return renderFriendsPageButton();
      default:
        return null;
    }
  };

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={options.title} />
      {renderPageSpecificButtons()}
    </Appbar.Header>
  );
}
