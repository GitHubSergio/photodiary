// Imports
import React from 'react';
import { ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';

// Actions
import { logOut } from '../../redux/middlewares/signingMiddleware';

// Components
import Button from '../shared/buttons/Button';

const Settings = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <ScrollView>
      <Button label="Log Out" onPress={handleLogOut} />
    </ScrollView>
  );
};

export default Settings;
