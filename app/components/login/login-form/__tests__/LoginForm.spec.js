/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from 'test-utils';
import { useRoute } from '@react-navigation/native';
import { fireEvent, wait } from '@testing-library/react-native';
import LoginForm from '../LoginForm';

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(() => ({
    name: 'SignInScreen',
  })),
  useNavigation: () => ({ goBack: jest.fn() }),
}));

jest.mock('@react-native-firebase/auth', () => ({}));

jest.mock('@react-native-firebase/firestore', () => ({}));

jest.mock('@react-native-firebase/storage', () => ({}));

jest.mock('react-native-image-picker', () => ({
  showImagePicker: jest.fn(),
}));

describe('<LoginForm />', () => {
  it('should render the LoginScreen component', () => {
    const { container } = renderWithRedux(<LoginForm />);
    expect(container).toMatchSnapshot();
  });

  it('should render the loader component when submitting the form', async () => {
    const { getByLabelText, queryByTestId, container } = renderWithRedux(
      <LoginForm />,
    );
    fireEvent.changeText(queryByTestId('email'), 'email@mail.com');
    fireEvent.changeText(queryByTestId('password'), 'password');
    fireEvent.press(getByLabelText('submit-button'));
    expect(container).toMatchSnapshot();
  });

  it('should display the Errors component', async () => {
    const { container, getByLabelText, queryByTestId } = renderWithRedux(
      <LoginForm />,
    );
    fireEvent.changeText(queryByTestId('email'), '');
    fireEvent.changeText(queryByTestId('password'), 'password');
    fireEvent.press(getByLabelText(`submit-button`));
    await wait(() => getByLabelText('error-msg'));
    expect(getByLabelText('error-msg')).toBeTruthy();
    expect(getByLabelText('error-msg').props.children).toBe(
      'Email is required',
    );
    expect(container).toMatchSnapshot();
  });

  it('should render the Sign Up screen', async () => {
    useRoute.mockImplementation(
      jest.fn(() => ({
        name: 'SignUpScreen',
      })),
    );

    const { container } = renderWithRedux(<LoginForm />);
    expect(container).toMatchSnapshot();
  });
});
