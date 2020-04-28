// Imports
import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const submitButtonStyles = StyleSheet.create({
  submitButton: {
    backgroundColor: Colors.blueMain,
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.whiteMain,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default submitButtonStyles;
