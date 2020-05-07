/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from 'test-utils';
import { useRoute } from '@react-navigation/native';
import { fireEvent } from 'react-native-testing-library';
import LoginForm from '../LoginForm';

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(() => ({
    name: 'SignInScreen',
  })),
  useNavigation: jest.fn(),
}));

jest.mock('@react-native-firebase/auth', () => ({}));
jest.mock('@react-native-firebase/firestore', () => ({}));

jest.mock('react-native-image-picker', () => ({
  showImagePicker: jest.fn(),
}));

describe('<LoginForm />', () => {
  describe('@render', () => {
    describe('@render Log In', () => {
      it('should render the LoginScreen component', () => {
        const { baseElement } = renderWithRedux(<LoginForm />);
        expect(baseElement).toMatchSnapshot();
      });

      it('should render the Loader component when attempting to login', () => {
        const { getByLabelText, baseElement } = renderWithRedux(<LoginForm />);

        fireEvent.changeText(getByLabelText('email'), 'test@mail.com');
        fireEvent.changeText(getByLabelText('password'), '123456');
        fireEvent.press(getByLabelText('submit-button'));
        expect(baseElement).toMatchSnapshot();
      });

      it('should render the error component if email is missing', () => {
        const { getByLabelText, baseElement } = renderWithRedux(<LoginForm />);

        fireEvent.changeText(getByLabelText('password'), '123456');
        fireEvent.press(getByLabelText('submit-button'));
        expect(baseElement).toMatchSnapshot();
      });
    });

    describe('@render Sign Up', () => {
      it('should render the SignUp component', () => {
        useRoute.mockImplementation(
          jest.fn(() => ({
            name: 'SignUpScreen',
          })),
        );

        const { baseElement } = renderWithRedux(<LoginForm />);

        expect(baseElement).toMatchSnapshot();
      });

      it('should render the Loader component when attempting to signup', () => {
        useRoute.mockImplementation(
          jest.fn(() => ({
            name: 'SignUpScreen',
          })),
        );
        useRoute.mockImplementation(
          jest.fn(() => ({
            name: 'SignUpScreen',
          })),
        );
        const { getByLabelText, baseElement } = renderWithRedux(<LoginForm />);

        fireEvent.changeText(getByLabelText('username'), 'MyUsername');
        fireEvent.changeText(getByLabelText('email'), 'test@mail.com');
        fireEvent.changeText(getByLabelText('password'), '123456');
        fireEvent.changeText(getByLabelText('confirm-password'), '123456');
        fireEvent.press(getByLabelText('submit-button'));
        expect(baseElement).toMatchSnapshot();
      });
    });
  });
});
