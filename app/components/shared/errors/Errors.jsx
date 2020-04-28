// Imports
import React from 'react';
import { View, Text } from 'react-native';
import errorsStyles from './errorsStyles';

const Errors = ({ errorMsg }) => {
  return (
    <View style={errorsStyles.errorView}>
      <Text accessibilityLabel="error-msg" style={errorsStyles.text}>
        {errorMsg}
      </Text>
    </View>
  );
};

export default Errors;
