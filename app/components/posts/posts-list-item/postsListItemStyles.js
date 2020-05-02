// Imports
import { StyleSheet, Platform } from 'react-native';
import styles from '../../shared/styles/styles';
import Colors from '../../../constants/Colors';

const postsListItemStyles = StyleSheet.create({
  postItemContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 150,
    backgroundColor: Colors.whiteMain,
    ...styles.shadow,
    alignItems: 'center',
    marginBottom: 10,
  },
  imgView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgLoaderView: {
    position: 'absolute',
  },
  postItemImg: {
    width: 150,
    height: 150,
  },
  contentsView: {
    flex: 1,
  },
  titleView: {
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  descriptionView: {
    flex: 1,
    paddingLeft: Platform.OS === 'android' ? 5 : 0,
  },
});

export default postsListItemStyles;
