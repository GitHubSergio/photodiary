import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const FBSignUp = async (displayName, email, password) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    await auth().currentUser.updateProfile({ displayName });

    const currentUser = await auth().currentUser._user;

    await firestore()
      .collection('users')
      .doc(currentUser.uid)
      .set({
        displayName,
        email,
        uid: currentUser.uid,
      });

    return currentUser;
  } catch (error) {
    return error.userInfo.message;
  }
};

export const FBLogin = async (email, password) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    return auth().currentUser._user;
  } catch (error) {
    return error.userInfo.message;
  }
};

export const FBLogOut = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    return error.userInfo.message;
  }
};
