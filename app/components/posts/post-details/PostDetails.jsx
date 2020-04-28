// Imports
import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  useRoute,
  useNavigation,
  useIsFocused,
} from '@react-navigation/native';
import postDetailsStyles from './postDetailsStyles';
import moment from 'moment';

// Actions
import {
  getPostDetails,
  clearPostsDetails,
  isEditingPost,
} from '../../../redux/actions/postsActions';
import { deletePost } from '../../../redux/middlewares/postsMiddleWare';
import { alertFactory } from '../../shared/alert/alertFactory';

// Components
import Loader from '../../shared/loader/Loader';
import PostDetailsMenu from '../post-details-menu/PostDetailsMenu';

const PostDetails = () => {
  const { postDetails } = useSelector((state) => state.posts);
  const { allPosts } = useSelector((state) => state.posts);
  const { deletePostSuccess } = useSelector((state) => state.posts);

  const [progressiveImage, setProgressiveImageState] = useState(false);
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const currentDate = moment(postDetails.createdAt).format('dddd Do MMM YYYY');

  useEffect(() => {
    if (isFocused) {
      dispatch(
        getPostDetails(
          allPosts.find((post) => post.postId === route.params.postId),
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  useEffect(() => {
    if (deletePostSuccess) {
      navigation.goBack();
    }

    return () => {
      dispatch(clearPostsDetails({}));
    };
  }, [deletePostSuccess, dispatch, navigation]);

  const handleDeletePost = () => {
    const { postId } = postDetails;
    alertFactory('Delete Post', 'Are you sure you want to delete this post?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        onPress: () => dispatch(deletePost(postId, postDetails.imageId)),
      },
    ]);
  };

  const handleEditPost = () => {
    navigation.navigate('UpdatePostDetailsScreen');
    dispatch(isEditingPost(true));
  };

  return (
    <>
      <ScrollView contentContainerStyle={postDetailsStyles.scrollView}>
        <View style={postDetailsStyles.postItemImgContainer}>
          {progressiveImage && (
            <View style={postDetailsStyles.loaderContainer}>
              <Loader />
            </View>
          )}
          <Image
            onLoadStart={() => setProgressiveImageState(true)}
            onLoadEnd={() => setProgressiveImageState(false)}
            style={postDetailsStyles.postItemImg}
            source={{ uri: postDetails.imageUri }}
            resizeMode="cover"
          />
        </View>
        <View style={postDetailsStyles.likesDateCommentsView}>
          <View>
            <Text>{postDetails.likes}</Text>
            <Text>{postDetails.comments}</Text>
          </View>
          <View>
            <Text>{currentDate}</Text>
          </View>
        </View>
        <Text>{postDetails.description}</Text>
      </ScrollView>
      <PostDetailsMenu
        handleDeletePost={handleDeletePost}
        handleEditPost={handleEditPost}
      />
    </>
  );
};

export default PostDetails;
