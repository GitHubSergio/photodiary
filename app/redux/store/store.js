/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware, compose } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { logger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk, logger)),
);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);
/*store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000),
);*/

export { store, persistor };
