// Imports
import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const buttonStyles = StyleSheet.create({
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
  headerButtonRT: {
    marginRight: 10,
  },
  headerButtonLT: {
    marginLeft: 10,
  },
  headerButtonText: {
    fontSize: 18,
  },
});

export default buttonStyles;
