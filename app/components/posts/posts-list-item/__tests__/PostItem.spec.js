/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import PostsListItem from '../PostsListItem';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('<PostItem />', () => {
  let wrapper;

  it('should render the PostItem component', () => {
    const navigate = useNavigation.mockImplementationOnce(() => ({
      navigate: jest.fn(),
    }));
    wrapper = render(
      <PostsListItem
        title="PostItem Title"
        description="PostItem description"
        docRef="4f1dd386-2ebd-485c-95f0-59d9d5d8974e"
      />,
    );
    fireEvent.press(wrapper.getByText('PostItem Title'));
    expect(navigate).toHaveBeenCalledTimes(1);
  });
});
