// Imports
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import submitButtonStyles from './submitButtonStyles';

const SubmitButton = ({ onPress, label, style, textStyle }) => {
  return (
    <TouchableOpacity
      style={[submitButtonStyles.submitButton, style]}
      onPress={onPress}>
      <Text
        accessibilityLabel="submit-button"
        style={[submitButtonStyles.text, textStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
