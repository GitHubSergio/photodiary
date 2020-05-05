/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from 'test-utils';
import { useNavigation, useRoute } from '@react-navigation/native';
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
        const { toJSON } = renderWithRedux(<LoginForm />);
        expect(toJSON()).toMatchSnapshot();
      });

      it('should render the Loader component when attempting to login', () => {
        const {
          getByAccessibilityLabel,
          getByPlaceholder,
          toJSON,
        } = renderWithRedux(<LoginForm />);

        fireEvent.changeText(getByPlaceholder('Email'), 'test@mail.com');
        fireEvent.changeText(getByPlaceholder('Password'), '123456');
        fireEvent.press(getByAccessibilityLabel('submit-button'));
        expect(toJSON()).toMatchSnapshot();
      });

      it('should render the error component if email is missing', () => {
        const {
          getByAccessibilityLabel,
          getByPlaceholder,
          toJSON,
        } = renderWithRedux(<LoginForm />);

        fireEvent.changeText(getByPlaceholder('Password'), '123456');
        fireEvent.press(getByAccessibilityLabel('submit-button'));
        expect(toJSON()).toMatchSnapshot();
      });
    });

    describe('@render Sign Up', () => {
      it('should render the SignUp component', () => {
        useRoute.mockImplementation(
          jest.fn(() => ({
            name: 'SignUpScreen',
          })),
        );

        const { toJSON } = renderWithRedux(<LoginForm />);

        expect(toJSON()).toMatchSnapshot();
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
        const {
          getByAccessibilityLabel,
          getByPlaceholder,
          toJSON,
        } = renderWithRedux(<LoginForm />);

        fireEvent.changeText(getByPlaceholder('Username'), 'MyUsername');
        fireEvent.changeText(getByPlaceholder('Email'), 'test@mail.com');
        fireEvent.changeText(getByPlaceholder('Password'), '123456');
        fireEvent.changeText(getByPlaceholder('Confirm Password'), '123456');
        fireEvent.press(getByAccessibilityLabel('submit-button'));
        expect(toJSON()).toMatchSnapshot();
      });
    });
  });

  describe('@event', () => {
    fit('should navigate to the Sign Up screen when tapping the Sign Up button', () => {
      const navigation = useNavigation.mockImplementationOnce(() => ({
        navigate: jest.fn(),
      }));
      console.log(navigation.mock)
      useRoute.mockImplementation(
        jest.fn(() => ({
          name: 'LoginScreen',
        })),
      );
      const { getByTestId } = renderWithRedux(<LoginForm />);
      fireEvent.press(getByTestId('switch-btn'));
      expect(navigation).toHaveBeenCalled();
    });
    it('should navigate to the Sign In screen when tapping the Sign In button', () => {
      const navigation = useNavigation.mockImplementationOnce(() => ({
        navigate: jest.fn(),
      }));
      useRoute.mockImplementation(
        jest.fn(() => ({
          name: 'SignUpScreen',
        })),
      );
      const { getByTestId } = renderWithRedux(<LoginForm />);
      fireEvent.press(getByTestId('switch-btn'));
      expect(navigation).toHaveBeenCalled();
    });
  });
});
