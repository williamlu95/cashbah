import { useEffect, useState } from 'react';
import {
  Pressable, StyleSheet, View, Text,
} from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { useSetRecoilState } from 'recoil';
import { authenticate } from '../apis/auth';
import { userAccessTokenSelector } from '../atoms/user';
import { showErrorToast } from '../components/Toast';

import { RootTabScreenProps } from '../types';
import { validateEmail } from '../utils/validators';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default function LoginScreen({ navigation } : RootTabScreenProps<'Login'>) {
  const setUserAccessToken = useSetRecoilState(userAccessTokenSelector);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });

  useEffect(
    () => {
      if (isSubmitted) {
        validateInput();
      }
    },
    [
      email,
      password,
    ],
  );

  const validateInput = () => {
    const newError = {
      email: validateEmail(email),
      password: !password ? 'Please enter a password' : '',
    };

    setError(newError);

    return Object.values(newError).every((value) => !value);
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    const isValidInput = validateInput();
    if (!isValidInput) {
      return;
    }

    try {
      const accessToken = await authenticate({
        email,
        password,
      });

      setUserAccessToken(accessToken);
    } catch (e: any) {
      console.error(e);
      showErrorToast('Username and/or password is incorrect.');
    }
  };

  return (
    <View style={styles.container}>
      <Title>Login</Title>
      <TextInput
        autoComplete="email"
        error={!!error.email}
        keyboardType="email-address"
        label="Email Address"
        textContentType="emailAddress"
        value={email}
        onChangeText={onChangeEmail}
      />
      <TextInput
        autoComplete="password"
        error={!!error.password}
        label="Password"
        secureTextEntry
        textContentType="password"
        value={password}
        onChangeText={onChangePassword}

      />
      <Button
        mode="contained"
        onPress={handleSubmit}
      >
        Sign In
      </Button>
      <Pressable
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text>Don&apos;t have an account? Register</Text>
      </Pressable>
    </View>
  );
}
