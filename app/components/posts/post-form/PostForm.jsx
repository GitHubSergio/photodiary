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
} from 'react-native';
import postFormStyles from './postFormStyles';

// Components
import InputField from '../../shared/input-field/InputField';

const APPROXIMATE_HEIGHT = 360;

const PostForm = ({ title, description, handleChoosePhoto }) => {
  const inputAccessoryViewID = 'inputAccessoryView1';
  console.log('Dimensions.get(window) >>>', Dimensions.get('window'));
  console.log('Dimensions.get(window) >>>', Dimensions.get('screen'));
  const [height, setHeight] = useState(APPROXIMATE_HEIGHT);

  useEffect(() => {
    let keyboardDidShowListener;

    keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );

    return () => {
      if (keyboardDidShowListener) {
        keyboardDidShowListener.remove();
      }
    };
  });

  const keyboardDidShow = (e) => {
    setHeight(e.endCoordinates.height); // sets the height after opening the keyboard
  };

  console.log('height >>>', height);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      keyboardVerticalOffset={10}>
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

      {Platform.OS === 'ios' ? (
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <View style={postFormStyles.keyboardToolBarContainer}>
            <TouchableOpacity onPress={handleChoosePhoto}>
              <Image
                source={require('../../../assets/images/add-image-icon.png')}
                style={postFormStyles.keyboardToolBarImage}
              />
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
      ) : (
        <View style={postFormStyles.keyboardToolBarContainer}>
          <TouchableOpacity onPress={handleChoosePhoto}>
            <Image
              source={require('../../../assets/images/add-image-icon.png')}
              style={postFormStyles.keyboardToolBarImage}
            />
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default PostForm;
