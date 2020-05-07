/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from 'test-utils';
import SwitchForm from '../SwitchForm';

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(() => ({
    name: 'SignInScreen',
  })),
  useNavigation: jest.fn(),
}));

describe('<SwitchForm />', () => {
  it('should return the label Sign Up if in the LoginScreen', () => {
    const { container } = renderWithRedux(<SwitchForm route="LoginScreen" />);
    expect(container).toMatchSnapshot();
  });

  it('should return the label Log In if in the SignUpScreen', () => {
    const { container } = renderWithRedux(<SwitchForm route="SignUpScreen" />);
    expect(container).toMatchSnapshot();
  });
});
