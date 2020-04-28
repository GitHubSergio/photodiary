// Imports
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Colors from '../../../constants/Colors';

const Loader = () => {
  return (
    <View testID="loader">
      <ActivityIndicator size="large" color={Colors.loader} />
    </View>
  );
};

export default Loader;
