// Imports
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import buttonStyles from './buttonStyles';

const Button = ({ onPress, label, style, textStyle }) => {
  return (
    <TouchableOpacity
      style={[buttonStyles.submitButton, style]}
      onPress={onPress}>
      <Text
        accessibilityLabel="submit-button"
        style={[buttonStyles.text, textStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
