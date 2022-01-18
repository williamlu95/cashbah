import { useState } from 'react';
import {
  Pressable, StyleSheet, View, Text,
} from 'react-native';
import { useRecoilValue } from 'recoil';
import Button from '../components/Button';
import Input from '../components/Input';

import { RootTabScreenProps } from '../types';

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
  const [email, onChangeemail] = useState('');
  const [password, onChangePassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });

  const handleSubmit = () => {};

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
        onChangeText={onChangeemail}
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
