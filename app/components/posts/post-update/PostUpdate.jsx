// Imports
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

// Hooks
import { useInput, useImagePicker } from '../../../utils/customHooks';

// Actions
import { updatePost } from '../../../redux/middlewares/postsMiddleWare';
import {
  clearSelectImageFromDeviceSuccess,
  isEditingPost as isEditingPostAction,
} from '../../../redux/actions/postsActions';

// Components
import PostForm from '../post-form/PostForm';
import PostImage from '../post-images/PostImage';
import HeaderButton from '../../shared/buttons/HeaderButton';
import Loader from '../../shared/loader/Loader';

const PostUpdate = () => {
  const { postDetails } = useSelector((state) => state.posts);
  const { isUpdatingPost } = useSelector((state) => state.posts);
  const { isEditingPost } = useSelector((state) => state.posts);
  const { updatePostSuccess } = useSelector((state) => state.posts);

  const title = useInput(postDetails.title);
  const description = useInput(postDetails.description);
  const [
    imageUriDevice,
    handleChoosePhoto,
    handleDeletePhoto,
  ] = useImagePicker();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [displayImageFromStorage, setDisplayImageFromStorage] = useState(true);
  const imageUri =
    !displayImageFromStorage || imageUriDevice
      ? imageUriDevice
      : postDetails.imageUri;

  useEffect(() => {
    imageUriDevice && setDisplayImageFromStorage(false);
  }, [imageUriDevice]);

  useEffect(() => {
    if (updatePostSuccess) {
      dispatch(clearSelectImageFromDeviceSuccess);
      navigation.navigate('PostsScreen');
    }
  }, [dispatch, navigation, updatePostSuccess]);

  const handleUpdatePost = useCallback(() => {
    dispatch(
      updatePost(
        postDetails.postId,
        title.value,
        description.value,
        postDetails.imageId,
        imageUriDevice,
      ),
    );
  }, [
    description.value,
    dispatch,
    imageUriDevice,
    postDetails.imageId,
    postDetails.postId,
    title.value,
  ]);

  const handleCloseModal = useCallback(() => {
    navigation.goBack();
    dispatch(isEditingPostAction(false));
  }, [dispatch, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton title="Update" action={handleUpdatePost} />
      ),
      headerLeft: () => (
        <HeaderButton title="Close" action={handleCloseModal} />
      ),
    });
  }, [handleCloseModal, handleUpdatePost, navigation]);

  const handleDeleteImageOnEdit = () => {
    setDisplayImageFromStorage(false);
  };

  return isUpdatingPost ? (
    <Loader />
  ) : (
    <ScrollView
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled">
      <PostForm
        title={title}
        description={description}
        handleChoosePhoto={handleChoosePhoto}
      />
      <PostImage
        uri={imageUri}
        handleDeletePhoto={handleDeletePhoto}
        handleDeleteImageOnEdit={handleDeleteImageOnEdit}
        isEditingPost={isEditingPost}
      />
    </ScrollView>
  );
};

export default PostUpdate;
