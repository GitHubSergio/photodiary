/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanup, render } from '@testing-library/react-native';
import reduxMockedStore from '../../../../utils/redux-state';
import PostsList from '../PostsList';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: jest.fn() }),
  useIsFocused: () => ({ isFocused: true }),
}));

jest.mock('react-redux', () => {
  return {
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
  };
});

jest.mock('@react-native-firebase/auth', () => ({}));

jest.mock('@react-native-firebase/firestore', () => ({}));

jest.mock('@react-native-firebase/storage', () => ({}));

describe('<PostsList/>', () => {
  describe('@render', () => {
    let wrapper;

    afterEach(() => {
      jest.resetAllMocks();
      cleanup();
    });

    it('should render the Loader component when loading the list', async () => {
      useSelector.mockImplementation(() => ({
        accessToken: '12345',
        isFetching: true,
      }));
      const getAllPosts = useDispatch.mockImplementationOnce(() => jest.fn());
      wrapper = render(<PostsList />);
      expect(getAllPosts).toHaveBeenCalledTimes(1);
      expect(wrapper.container).toMatchSnapshot();
    });

    it('should render the list of posts', async () => {
      useSelector.mockImplementation(() => ({
        accessToken: '12345',
        allPosts: reduxMockedStore.posts.allPosts,
      }));
      useDispatch.mockImplementationOnce(() => jest.fn());
      wrapper = render(<PostsList />);
      expect(wrapper.container).toMatchSnapshot();
    });

    it('should render the NoPosts component if not posts are found', async () => {
      useSelector.mockImplementation(() => ({
        accessToken: '123',
        allPosts: [],
      }));
      useDispatch.mockImplementationOnce(() => jest.fn());
      wrapper = render(<PostsList />);
      expect(wrapper.container).toMatchSnapshot();
    });

    it('should dispatch the clearPostSuccess', () => {
      useSelector.mockImplementation(() => ({
        accessToken: '123',
        allPosts: reduxMockedStore.posts.allPosts,
        success: true,
      }));
      const clearPostsSuccess = useDispatch.mockImplementationOnce(() =>
        jest.fn(),
      );
      wrapper = render(<PostsList />);
      expect(clearPostsSuccess).toHaveBeenCalledTimes(1);
    });
  });
});
