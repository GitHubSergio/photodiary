// Imports
import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const keyboardToolBoxStyles = StyleSheet.create({
  keyboardToolBarContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.whiteMain,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  keyboardToolBarButtonDoneText: {
    color: 'orange',
  },
  keyboardToolBarImage: {
    maxWidth: 40,
    maxHeight: 40,
    borderWidth: 1,
    borderRadius: 100,
  },
});

export default keyboardToolBoxStyles;
