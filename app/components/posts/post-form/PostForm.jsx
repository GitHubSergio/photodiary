// Imports
import React, { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, Keyboard } from 'react-native';
import postFormStyles from './postFormStyles';

// Components
import InputField from '../../shared/input-field/InputField';
import KeyboardToolBox from './KeyboardToolBox';

const PostForm = ({ title, description, handleChoosePhoto }) => {
  const inputAccessoryViewID = 'inputAccessoryView1';
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState();

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
    setToolbarPosition(e.endCoordinates.height - 50);
    setIsKeyboardOpen(!isKeyboardOpen);
  };

  return (
    <>
      <View style={postFormStyles.postFormContainer}>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          keyboardVerticalOffset={80}
          style={postFormStyles.keyboardAvoidingView}>
          <View>
            <InputField
              placeHolder="Post Title"
              inputValue={title}
              inputAccessoryViewID={inputAccessoryViewID}
            />
          </View>
          <View style={postFormStyles.separator}>
            <InputField
              style={[
                postFormStyles.postFormDescriptionInput,
                { maxHeight: toolbarPosition - 60 || 300 },
              ]}
              placeHolder="Description"
              inputValue={description}
              multiline
              inputAccessoryViewID={inputAccessoryViewID}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
      <KeyboardToolBox
        handleAction={handleChoosePhoto}
        iosNativeID={inputAccessoryViewID}
        isKeyboardOpen={isKeyboardOpen}
        extraStyle={{ bottom: toolbarPosition }}
      />
    </>
  );
};

export default PostForm;
