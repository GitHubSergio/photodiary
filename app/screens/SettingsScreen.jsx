// Imports
import React from 'react';
import { View } from 'react-native';
import styles from '../components/shared/styles/styles';

// Components
import Settings from '../components/settings/Settings';

const SettingsScreen = () => {
  return (
    <View style={styles.view}>
      <Settings />
    </View>
  );
};

export default SettingsScreen;
