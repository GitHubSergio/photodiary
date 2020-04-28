// Imports
import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Colors.linearBgLC,
    padding: 10,
  },
  // TODO - maybe create a function to make values dynamic
  shadow: {
    shadowColor: Colors.blueMain,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
});

export default styles;
