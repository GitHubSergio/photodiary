// Imports
import React from 'react';
import { Button } from 'react-native';
import Colors from '../../../constants/Colors';

const HeaderButton = ({ title, action }) => {
  return <Button title={title} onPress={action} color={Colors.whiteMain} />;
};

export default HeaderButton;
