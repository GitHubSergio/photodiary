// Imports
import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import postsListStyles from './postsListStyles';

// Actions
import { getAllPosts } from '../../../redux/middlewares/postsMiddleWare';
import {
  clearPostsSuccess,
  clearDeletePostSuccess,
  clearUpdatePostSuccess,
} from '../../../redux/actions/postsActions';

// Components
import PostsListItem from '../posts-list-item/PostsListItem';
import Loader from '../../shared/loader/Loader';
import NoPosts from '../no-posts/NoPosts';
import Button from '../../shared/buttons/Button';

const ITEM_HEIGHT = 200;
const extractKey = ({ postId }) => postId;

const PostsList = () => {
  const { email } = useSelector((state) => state.user.userDetails);
  const { allPosts } = useSelector((state) => state.posts);
  const { isFetching } = useSelector((state) => state.posts);
  const { createPostSuccess } = useSelector((state) => state.posts);
  const { deletePostSuccess } = useSelector((state) => state.posts);
  const { updatePostSuccess } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (email) {
      dispatch(getAllPosts());
      console.log('USEEFFECT ONE');
      // TODO implement https://reactnavigation.org/docs/use-scroll-to-top
    }
  }, [dispatch, email]);

  useEffect(() => {
    if (isFocused && createPostSuccess) {
      console.log('USEEFFECT IF ONE');
      dispatch(clearPostsSuccess(0));
      dispatch(getAllPosts());
    }

    if (updatePostSuccess) {
      console.log('USEEFFECT IF TWO');
      dispatch(clearUpdatePostSuccess(0));
      dispatch(getAllPosts());
    }

    if (isFocused && deletePostSuccess) {
      console.log('USEEFFECT IF THREE');
      dispatch(clearDeletePostSuccess(0));
      dispatch(getAllPosts());
    }
  }, [
    isFocused,
    createPostSuccess,
    deletePostSuccess,
    updatePostSuccess,
    dispatch,
  ]);

  return isFetching ? (
    <Loader />
  ) : (
    <>
      {allPosts.length > 0 ? (
        <FlatList
          testID={'listPosts'}
          data={allPosts}
          removeClippedSubviews
          renderItem={({ item }) => (
            <PostsListItem
              title={item.title}
              description={item.description}
              postId={item.postId}
              imageUri={item.imageUri}
            />
          )}
          keyExtractor={extractKey}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
        />
      ) : (
        <NoPosts />
      )}
      <Button
        label="+"
        onPress={() => navigation.navigate('AddNewPostScreen')}
        style={postsListStyles.addButton}
        textStyle={postsListStyles.addButtonText}
      />
    </>
  );
};

export default PostsList;
