// Imports
import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const postFormStyles = StyleSheet.create({
  postFormContainer: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  postFormDescriptionInput: {
    padding: 5,
    width: '100%',
  },
  separator: {
    flex: 1,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.linearBgDC,
  },
});

export default postFormStyles;
