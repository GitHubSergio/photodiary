// Imports
import { StyleSheet } from 'react-native';

const postDetailsStyles = StyleSheet.create({
  scrollView: {
    paddingBottom: 80,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFill,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
  },
  imgView: {
    width: 400,
    height: 400,
  },
  postItemImgContainer: {
    height: 400,
    width: 400,
  },
  postItemImg: {
    width: 400,
    height: 400,
  },
  likesDateCommentsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
});

export default postDetailsStyles;
