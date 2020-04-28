// Imports
import React from 'react';
import { Image } from 'react-native';
import logoStyles from './logoStyles';

const Logo = () => {
  return (
    <Image
      style={logoStyles.logoBackground}
      source={require('../../assets/images/logo-resized.png')}
    />
  );
};

export default Logo;
