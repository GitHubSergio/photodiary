// Imports
import { StyleSheet, Platform } from 'react-native';
import Colors from '../../../constants/Colors';

const keyboardToolBoxStyles = StyleSheet.create({
  keyboardToolBarContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.whiteMain,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    ...Platform.select({
      android: {
        position: 'absolute',
      },
    }),
    width: '100%',
    zIndex: 2,
  },
  keyboardToolBarButtonDoneText: {
    color: Colors.blueMain,
  },
  keyboardToolBarImage: {
    maxWidth: 40,
    maxHeight: 40,
    borderWidth: 1,
    borderRadius: 100,
  },
});

export default keyboardToolBoxStyles;
