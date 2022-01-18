import { useEffect, useState } from 'react';
import {
  Pressable, StyleSheet, View, Text,
} from 'react-native';
import { useSetRecoilState } from 'recoil';
import { authenticate } from '../apis/auth';
import { userAccessTokenState } from '../atoms/user';
import Button from '../components/Button';
import Input from '../components/Input';
import { showErrorToast } from '../components/Toast';

import { RootTabScreenProps } from '../types';
import { validateEmail } from '../utils/validators';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default function LoginScreen({ navigation } : RootTabScreenProps<'Login'>) {
  const setUserAccessToken = useSetRecoilState(userAccessTokenState);
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
      <Text style={styles.title}>Login</Text>
      <Input
        autoCompleteType="email"
        error={error.email}
        keyboardType="email-address"
        label="Email Address"
        textContentType="emailAddress"
        value={email}
        onChangeText={onChangeEmail}
      />
      <Input
        autoCompleteType="password"
        error={error.password}
        label="Password"
        secureTextEntry
        textContentType="password"
        value={password}
        onChangeText={onChangePassword}

      />
      <Button
        onPress={handleSubmit}
        title="Sign In"
      />
      <Pressable
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text>Don&apos;t have an account? Register</Text>
      </Pressable>
    </View>
  );
}
