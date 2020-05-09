/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import rootReducer from '../redux/reducers';
import { render } from '@testing-library/react-native';
// import { render } from 'react-native-testing-library';
import reduxStoreStateMocked from './redux-state';

export const renderWithReduxMockedStore = (ui, updatedStore) => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore({ ...reduxStoreStateMocked, ...updatedStore });
  // console.log(store.getState());
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
  };
};

export const renderWithRedux = (
  ui,
  {
    initialState,
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
  } = {},
) => ({
  ...render(<Provider store={store}>{ui}</Provider>),
  store,
});
