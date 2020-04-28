// Imports
import React from 'react';
import { View } from 'react-native';
import styles from '../components/shared/styles/styles';

// Components
import LoginForm from '../components/login/login-form/LoginForm';

const LoginScreen = () => {
  return (
    <View style={styles.view}>
      <LoginForm />
    </View>
  );
};

export default LoginScreen;
