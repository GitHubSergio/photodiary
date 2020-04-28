// Imports
import { StyleSheet } from 'react-native';
import styles from '../../shared/styles/styles';

const postsListStyles = StyleSheet.create({
  addButton: {
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 30,
    right: 10,
    borderRadius: 100,
    ...styles.shadow,
  },
  addButtonText: {
    fontSize: 30,
  },
});

export default postsListStyles;
