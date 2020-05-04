import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { uuidGenerator } from '../../utils/helpers';

export const FBGetAllPosts = async () => {
  const allPosts = [];
  try {
    const currentUser = await auth().currentUser._user;
    const querySnapshot = await firestore()
      .collection('posts')
      .where('userId', '==', `${currentUser.uid}`)
      .get();

    querySnapshot.forEach((post) => {
      allPosts.push(post._data);
    });

    return allPosts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  } catch (error) {
    return error.userInfo.message;
  }
};

const FBUploadImage = async (imageUri, userId, imageTobeDeleted) => {
  const imageId = imageUri.substring(imageUri.lastIndexOf('/') + 1);
  try {
    /*const imageFromStorage =
      Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri.replace('file://', '');*/

    const imageFromStorage = imageUri.replace('file://', '');

    let storageReference;
    if (imageTobeDeleted) {
      storageReference = await storage().ref(`${userId}/${imageTobeDeleted}`);
    } else {
      storageReference = await storage().ref(`${userId}/${imageId}`);
    }

    const uploadFile = await storageReference.putFile(`${imageFromStorage}`);

    let imagePathFromStorage;
    if (uploadFile.state === 'success') {
      imagePathFromStorage = await storageReference.getDownloadURL();
    }

    return {
      imagePathFromStorage,
      imageId,
      status: 200,
    };
  } catch (error) {
    return error.userInfo.message;
  }
};

export const FBCreatePost = async (title, description, imageUri) => {
  const postId = uuidGenerator();
  try {
    const currentUser = await auth().currentUser._user;
    const { imagePathFromStorage, imageId, status } = await FBUploadImage(
      imageUri,
      currentUser.uid,
    );

    let newPost = {};
    if (status === 200) {
      newPost = {
        createdAt: new Date().toISOString(),
        description,
        imageUri: imagePathFromStorage,
        imageId,
        title,
        postId,
        userId: currentUser.uid,
      };

      await firestore()
        .collection('posts')
        .doc(postId)
        .set(newPost);
    }

    return {
      ...newPost,
      status: 201,
    };
  } catch (error) {
    return error.userInfo.message;
  }
};

const FBDeleteImage = async (userId, imageId) => {
  try {
    const ref = await storage().ref(`${userId}/${imageId}`);
    await ref.delete();

    return { message: 'Image Deleted', status: 200 };
  } catch (error) {
    return error.userInfo.message;
  }
};

export const FBDeletePost = async (postId, imageId) => {
  try {
    const currentUser = await auth().currentUser._user;
    const { status } = await FBDeleteImage(currentUser.uid, imageId);

    if (status === 200) {
      await firestore()
        .doc(`posts/${postId}`)
        .delete();
    }

    return {
      status: 200,
      message: 'Post Deleted',
    };
  } catch (error) {
    return error.userInfo.message;
  }
};

export const FBUpdatePost = async (
  postId,
  title,
  description,
  imageIdToBeDelete,
  imageUriToBeUploaded,
) => {
  try {
    let imageResponse = {};
    if (imageUriToBeUploaded) {
      const currentUser = await auth().currentUser._user;
      const { imagePathFromStorage, status } = await FBUploadImage(
        imageUriToBeUploaded,
        currentUser.uid,
        imageIdToBeDelete,
      );

      imageResponse = {
        imagePathFromStorage,
        status,
      };
    }

    const { imagePathFromStorage } = imageResponse;
    const updatedPost = {
      createdAt: new Date().toISOString(),
      description,
      ...(imagePathFromStorage && { imageUri: imagePathFromStorage }),
      title,
    };
    console.log('updatedPost >>>', updatedPost);

    await firestore()
      .collection('posts')
      .doc(postId)
      .update(updatedPost);

    return {
      ...updatedPost,
      status: 200,
    };
  } catch (error) {
    return error.userInfo.message;
  }
};
