/**
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './app/App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/redux/store/store';

const MobileApp = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => MobileApp);
