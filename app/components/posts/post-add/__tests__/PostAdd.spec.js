/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useSelector } from 'react-redux';
import { render } from '@testing-library/react-native';
import PostAdd from '../PostAdd';

jest.mock('react-native-image-picker', () => ({
  showImagePicker: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: jest.fn(),
    setOptions: jest.fn(),
  }),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('@react-native-firebase/auth', () => ({}));

jest.mock('@react-native-firebase/firestore', () => ({}));

jest.mock('@react-native-firebase/storage', () => ({}));

describe('<AddNewPostForm />', () => {
  let wrapper;
  it('should render the AddNewPostForm component', () => {
    useSelector.mockImplementation(() => ({
      accessToken: '12345',
    }));
    wrapper = render(<PostAdd />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
