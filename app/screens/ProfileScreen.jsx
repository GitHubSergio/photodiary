// Imports
import React from 'react';
import { Button, View } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('SettingsScreen')}
      />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ProfileScreen;
