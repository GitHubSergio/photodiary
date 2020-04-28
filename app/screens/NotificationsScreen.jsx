// Imports
import React from 'react';
import { Button, View } from 'react-native';

const NotificationsScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('ProfileScreen')}
      />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default NotificationsScreen;
