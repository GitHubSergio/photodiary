// Imports
import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../constants/Colors';

const postImageStyles = StyleSheet.create({
  img: {
    width: Dimensions.get('window').width,
    height: 400,
    zIndex: -1,
  },
  deleteBtnContainer: {
    backgroundColor: 'black',
    position: 'absolute',
    top: 5,
    right: 5,
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  deleteBtnText: {
    color: Colors.whiteMain,
    fontSize: 20,
    fontWeight: 'bold',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
});

export default postImageStyles;
