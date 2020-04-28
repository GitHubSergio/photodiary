// Imports
import { Alert } from 'react-native';

export const alertFactory = (title, msg, [...opts], cancelable: false) => {
  Alert.alert(title, msg, [...opts], cancelable);
};
