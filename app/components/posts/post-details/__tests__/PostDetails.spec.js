/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fireEvent, render, wait } from '@testing-library/react-native';
import reduxMockedStore from '../../../../utils/redux-state';
import PostDetails from '../PostDetails';

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(() => ({
    params: {
      docRef: '4f1dd386-2ebd-485c-95f0-59d9d5d8974e',
      title: 'Copenhagen',
    },
  })),
  useNavigation: () => ({ goBack: jest.fn() }),
  useIsFocused: () => jest.fn(),
}));

jest.mock('react-redux', () => {
  return {
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
  };
});

jest.mock('react-native/Libraries/Alert/Alert.js', () => ({
  alert: jest.fn(),
}));

jest.mock('@react-native-firebase/auth', () => ({}));

jest.mock('@react-native-firebase/firestore', () => ({}));

jest.mock('@react-native-firebase/storage', () => ({}));

describe.skip('<PostDetails />', () => {
  let wrapper;

  beforeEach(() => jest.clearAllMocks());

  it('should render the PostDetails component', async () => {
    useSelector.mockImplementation(() => ({
      postDetails: reduxMockedStore.posts.postDetails,
      success: 200,
    }));
    useDispatch.mockImplementationOnce(() => jest.fn());
    wrapper = render(<PostDetails />);
    await wait(() => wrapper.getByLabelText('submit-button'));
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should dispatch the clearPostSuccess', () => {
    useSelector.mockImplementation(() => ({
      postDetails: {},
      success: 0,
    }));
    const clearPostsSuccess = useDispatch.mockImplementationOnce(() =>
      jest.fn(),
    );
    wrapper = render(<PostDetails />);
    expect(clearPostsSuccess).toHaveBeenCalledTimes(1);
  });

  it('should display the loader when fetching the post details', () => {
    useSelector.mockImplementation(() => ({
      postDetails: {},
      isFetching: true,
    }));
    const clearPostsSuccess = useDispatch.mockImplementationOnce(() =>
      jest.fn(),
    );
    wrapper = render(<PostDetails />);
    expect(clearPostsSuccess).toHaveBeenCalledTimes(1);
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should trigger the Alert modal if the user presses the deletes button', async () => {
    const spy = jest.spyOn(Alert, 'alert');
    useSelector.mockImplementation(() => ({
      postDetails: reduxMockedStore.posts.postDetails,
      isFetching: false,
    }));
    useDispatch.mockImplementationOnce(() => jest.fn());
    wrapper = render(<PostDetails />);
    fireEvent.press(wrapper.getByLabelText('submit-button'));
    await wait(() => Alert.alert.mock.calls[0][2][1].onPress());
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should delete the post details', async () => {
    useSelector.mockImplementation(() => ({
      postDetails: reduxMockedStore.posts.postDetails,
      isDeleting: true,
    }));
    const deletePost = useDispatch.mockImplementationOnce(() => jest.fn());
    wrapper = render(<PostDetails />);
    expect(deletePost).toHaveBeenCalledTimes(1);
    expect(wrapper.container).toMatchSnapshot();
  });
});
