// Imports
import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SwitchForm = ({ route }) => {
  const navigation = useNavigation();
  const goTo = route === 'LoginScreen' ? 'SignUpScreen' : 'LoginScreen';
  const label = route === 'LoginScreen' ? 'Sign Up' : 'Log In';

  return <Button testID="switch-btn" onPress={() => navigation.navigate(goTo)} title={label} />;
};

export default SwitchForm;
