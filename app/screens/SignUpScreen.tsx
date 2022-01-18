import { useEffect, useState } from 'react';
import {
  Pressable, StyleSheet, Text, View,
} from 'react-native';
import { useSetRecoilState } from 'recoil';
import { createUser } from '../apis/users';
import { userAccessTokenState } from '../atoms/user';

import Button from '../components/Button';
import Input from '../components/Input';
import PhoneInput from '../components/PhoneInput';
import { showErrorToast } from '../components/Toast';

import { RootTabScreenProps } from '../types';
import { validateEmail, validatePassword } from '../utils/validators';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
  },
});

export default function SignUpScreen({ navigation } : RootTabScreenProps<'SignUp'>) {
  const setUserAccessToken = useSetRecoilState(userAccessTokenState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, onChangeName] = useState('');
  const [phoneNumber, onChangePhoneNumber] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [error, setError] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  useEffect(
    () => {
      if (isSubmitted) {
        validateInput();
      }
    },
    [
      name,
      phoneNumber,
      email,
      password,
    ],
  );

  const validateInput = () => {
    const newError = {
      name: !name ? 'Please enter a name' : '',
      phoneNumber: !phoneNumber ? 'Please enter a phone number' : '',
      email: validateEmail(email),
      password: validatePassword(password),
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
      const accessToken = await createUser({
        name,
        phoneNumber,
        email,
        password,
      });

      setUserAccessToken(accessToken);
    } catch (e: any) {
      console.error(e);
      showErrorToast('This email is already associated to an account.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>
      <Input
        autoCompleteType="name"
        error={error.name}
        keyboardType="default"
        label="Full Name"
        textContentType="name"
        value={name}
        onChangeText={onChangeName}
      />
      <PhoneInput
        error={error.phoneNumber}
        label="Mobile Number"
        phoneNumber={phoneNumber}
        onChangeText={onChangePhoneNumber}
      />
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
        title="Register"
      />
      <Pressable
        onPress={() => navigation.navigate('Login')}
      >
        <Text>Already have an account? Sign In</Text>
      </Pressable>
    </View>
  );
}