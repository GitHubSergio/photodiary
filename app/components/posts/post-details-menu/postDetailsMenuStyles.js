// Imports
import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const postDetailsMenuStyles = StyleSheet.create({
  menuBaseButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 10,
    backgroundColor: Colors.blueMain,
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  menuBaseButtonBar: {
    height: 3,
    width: 30,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  menuDeleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 140,
    right: 10,
    backgroundColor: Colors.blueMain,
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  menuEditButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 90,
    right: 10,
    backgroundColor: Colors.blueMain,
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  menuButtonsText: {
    color: Colors.whiteMain,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default postDetailsMenuStyles;
