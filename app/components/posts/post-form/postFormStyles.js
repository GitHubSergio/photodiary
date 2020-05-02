// Imports
import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const postFormStyles = StyleSheet.create({
  postFormDescriptionInput: {
    padding: 5,
    minWidth: '100%',
  },
  separator: {
    flex: 2,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.linearBgDC,
  },
});

export default postFormStyles;
