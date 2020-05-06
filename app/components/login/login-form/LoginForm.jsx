// Imports
import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';

// Hooks
import { useInput } from '../../../utils/customHooks';

// Actions
import { signIn, signUp } from '../../../redux/middlewares/signingMiddleware';

// Components
import Logo from '../../logo/Logo';
import InputField from '../../shared/input-field/InputField';
import Button from '../../shared/buttons/Button';
import Loader from '../../shared/loader/Loader';
import Errors from '../../shared/errors/Errors';
import SwitchForm from './SwitchForm';

const LoginForm = () => {
  const { isSigning } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.user);
  const { name } = useRoute();

  const displayName = useInput('');
  const email = useInput('');
  const password = useInput('');
  const confirmPassword = useInput('');
  const dispatch = useDispatch();
  const isSignUpScreen = name === 'SignUpScreen';

  const handleSubmit = () => {
    isSignUpScreen
      ? dispatch(
          signUp(
            displayName.value,
            email.value,
            password.value,
            confirmPassword.value,
          ),
        )
      : dispatch(signIn(email.value, password.value));
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior="position"
        enabled
        keyboardVerticalOffset={70}>
        <Logo />

        {isSignUpScreen && (
          <InputField
            accessibilityLabel="username"
            placeHolder="Username"
            inputValue={displayName}
            onSubmitEditing={handleSubmit}
          />
        )}

        <InputField
          accessibilityLabel="email"
          placeHolder="Email"
          inputValue={email}
          onSubmitEditing={handleSubmit}
          keyboardType={'email-address'}
        />
        <InputField
          accessibilityLabel="password"
          placeHolder="Password"
          inputValue={password}
          onSubmitEditing={handleSubmit}
          secureTextEntry
        />

        {isSignUpScreen && (
          <InputField
            accessibilityLabel="confirm-password"
            placeHolder="Confirm Password"
            inputValue={confirmPassword}
            onSubmitEditing={handleSubmit}
            secureTextEntry
          />
        )}

        {isSigning ? (
          <Loader />
        ) : (
          <>
            <Button label="SUBMIT" onPress={handleSubmit} />
            <SwitchForm route={name} />
          </>
        )}
        {!!error && <Errors errorMsg={error} />}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LoginForm;
