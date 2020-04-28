/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import reduxStore from 'test-utils';
import Logo from '../Logo';

describe('<Logo/>', () => {
  describe('@render', () => {
    it('should render the Logo component', () => {
      const { container } = reduxStore.renderWithRedux(<Logo />);
      expect(container).toMatchSnapshot();
    });
  });
});
