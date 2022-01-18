import {
  StyleSheet, Pressable, Text, GestureResponderEvent, View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: 'black',
    width: '100%',
  },
  text: {
    fontSize: 14,
    color: 'white',
  },
});

export default function Button({ title, onPress } :
{ title: string, onPress: (event: GestureResponderEvent) => void }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}
