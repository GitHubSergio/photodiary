// Imports
import React, { useEffect, useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  InputAccessoryView,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
  Keyboard,
  ScrollView,
  TextInput,
  Text,
} from 'react-native';
import postFormStyles from './postFormStyles';

// Components
import InputField from '../../shared/input-field/InputField';
import { IOSToolBox, KeyboardToolBox, ToolBoxButton } from './KeyboardToolBox';

const APPROXIMATE_HEIGHT = 360;

const PostForm = ({ title, description, handleChoosePhoto }) => {
  const inputAccessoryViewID = 'inputAccessoryView1';
  console.log('Dimensions.get(window) >>>', Dimensions.get('window'));
  const [height, setHeight] = useState(APPROXIMATE_HEIGHT);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    let keyboardDidShowListener;
    let keyboardDidHideListener;

    keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );

    keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidShow,
    );

    return () => {
      if (keyboardDidShowListener) {
        keyboardDidShowListener.remove();
      }
      if (keyboardDidHideListener) {
        keyboardDidHideListener.remove();
      }
    };
  });

  const keyboardDidShow = (e) => {
    setIsKeyboardOpen(!isKeyboardOpen);
    setHeight(e.endCoordinates.height); // sets the height after opening the keyboard
  };

  console.log('height >>>', height);

  // TODO - refactor this component
  return (
    <View
      style={{
        flex: 1,
      }}>
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        keyboardVerticalOffset={90}
        style={{ flex: 1, justifyContent: 'space-between' }}>
        <InputField
          placeHolder="Post Title"
          inputValue={title}
          inputAccessoryViewID={inputAccessoryViewID}
        />
        <View style={postFormStyles.separator}>
          <InputField
            style={postFormStyles.postFormDescriptionInput}
            placeHolder="Description"
            inputValue={description}
            multiline
            inputAccessoryViewID={inputAccessoryViewID}
          />
        </View>
        {
          <KeyboardToolBox
            handleAction={handleChoosePhoto}
            iosNativeID={inputAccessoryViewID}
            isKeyboardOpen={isKeyboardOpen}
          />
        }
      </KeyboardAvoidingView>
    </View>
  );
};

export default PostForm;
