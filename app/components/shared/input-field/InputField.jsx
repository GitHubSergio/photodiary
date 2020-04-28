// Imports
import React from 'react';
import { TextInput } from 'react-native';
import inputFieldStyles from './inputFieldStyles';

const InputField = ({
  style,
  placeHolder,
  inputValue,
  onSubmitEditing,
  ...rest
}) => {
  return (
    <TextInput
      style={[inputFieldStyles.textInput, style]}
      placeholder={placeHolder}
      placeholderTextColor="grey"
      onSubmitEditing={onSubmitEditing}
      {...inputValue}
      {...rest}
    />
  );
};

export default InputField;
