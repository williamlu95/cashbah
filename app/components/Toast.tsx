import Toast from 'react-native-root-toast';

export const showErrorToast = (message: string) => Toast.show(message, {
  duration: Toast.durations.LONG,
  position: Toast.positions.TOP,
  animation: true,
  hideOnPress: true,
  backgroundColor: '#D81A1A',
});

export const showSuccessToast = (message: string) => Toast.show(message, {
  duration: Toast.durations.LONG,
  position: Toast.positions.TOP,
  animation: true,
  hideOnPress: true,
  backgroundColor: '#379D00',
});
