// Imports
import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const postFormStyles = StyleSheet.create({
  postFormDescriptionInput: {
    padding: 5,
    maxHeight: 220,
    minWidth: '100%',
  },
  separator: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.linearBgDC,
  },
  keyboardToolBarContainer: {
    backgroundColor: 'white',
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

export default postFormStyles;
