import {
  useEffect, useRef, useState,
} from 'react';
import {
  StyleSheet, TextInput, TextInputProps, View, Animated, TextStyle,
} from 'react-native';
import { ERROR } from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 18,
    paddingBottom: 10,
  },
  input: {
    height: 26,
    borderBottomWidth: 1,
  },
  inputError: {
    borderBottomWidth: 2,
    borderBottomColor: ERROR,
  },
  error: {
    color: ERROR,
  },
});

type InputTypeProps = TextInputProps & {
  error?: string,
  label: string,
};

export default function Input(props : InputTypeProps) {
  const { error, label, ...textInputProps } = props;

  const [isFocused, setIsFocused] = useState(!!textInputProps.value);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isFocused ? 1 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const labelStyle = {
    position: 'absolute',
    left: 0,
    top: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 0],
    }),
    fontSize: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 14],
    }),
    color: error ? ERROR : animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#000'],
    }),
  } as Animated.WithAnimatedObject<TextStyle>;

  const handleBlur = () => {
    if (!textInputProps.value) {
      setIsFocused(false);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        style={error ? styles.inputError : styles.input}
        {...textInputProps}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
      />
      <Animated.Text style={styles.error}>{error}</Animated.Text>
    </View>
  );
}

Input.defaultProps = {
  error: '',
};
