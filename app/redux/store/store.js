/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
const createDebugger = require('redux-flipper').default;

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['user'],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: ['posts'],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
const reduxDebugger = createDebugger();

let store = createStore(
  persistedReducer,
  applyMiddleware(thunk, reduxDebugger),
);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);
/*store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000),
);*/

export { store, persistor };
