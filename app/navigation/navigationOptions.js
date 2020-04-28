// Imports
import Colors from '../constants/Colors';

const navigationOptions = {
  stack: {
    global: {
      headerStyle: {
        backgroundColor: Colors.blueMain,
      },
      headerTintColor: Colors.whiteMain,
    },
    loginScreen: {
      headerTitle: 'LOG IN',
    },
    signUpScreen: {
      headerTitle: 'SIGN UP',
    },
    postsScreen: {
      headerTitle: 'POSTS',
    },
    addNewPostScreen: {
      headerTitle: 'NEW POST',
    },
    editPostScreen: {
      headerTitle: 'UPDATE POST',
    },
    settingsScreen: {
      headerTitle: 'SETTINGS',
    },
  },
  tabs: {
    style: {
      backgroundColor: Colors.blueMain,
    },
    activeTintColor: Colors.whiteMain,
    inactiveTintColor: Colors.bermudaGrey,
  },
};

export default navigationOptions;
