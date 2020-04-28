// Imports
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { enableScreens } from 'react-native-screens';

// Stacks
import SigningStackNavigator from './navigation/SigningStackNavigator';
import TabNavigator from './navigation/TabNavigator';

enableScreens();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (userAuth) => {
    setUser(userAuth);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return null;
  }

  return !user ? <SigningStackNavigator /> : <TabNavigator />;
}
