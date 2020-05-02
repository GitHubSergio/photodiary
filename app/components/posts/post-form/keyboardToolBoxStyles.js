// Imports
import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const keyboardToolBoxStyles = StyleSheet.create({
  keyboardToolBarContainer: {
    backgroundColor: Colors.whiteMain,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardToolBarImage: {
    maxWidth: 40,
    maxHeight: 40,
    borderWidth: 1,
    borderRadius: 100,
  },
});

export default keyboardToolBoxStyles;
