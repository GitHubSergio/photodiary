/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from 'test-utils';
import { useRoute, useNavigation } from '@react-navigation/native';
import { render, fireEvent } from 'react-native-testing-library';
import SwitchForm from '../SwitchForm';

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(() => ({
    name: 'SignInScreen',
  })),
  useNavigation: jest.fn(),
}));

/*describe('<SwitchForm />', () => {
  it('should return the label Sign Up if in the LoginScreen', () => {
    const { toJSON } = render(<SwitchForm route="LoginScreen" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should return the label Log In if in the SignUpScreen', () => {
    const { toJSON } = render(<SwitchForm route="SignUpScreen" />);
    expect(toJSON()).toMatchSnapshot();
  });
});*/
