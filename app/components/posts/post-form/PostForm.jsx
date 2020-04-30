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
  const [keyboardState, setKeyboardState] = useState(false);

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
    setKeyboardState(!keyboardState);
    setHeight(e.endCoordinates.height); // sets the height after opening the keyboard
  };

  console.log('height >>>', height);

  return (
    <>
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1, backgroundColor: 'green' }}>
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
        {Platform.OS === 'ios' && (
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
        )}
      </ScrollView>
      {keyboardState && Platform.OS === 'android' && (
        <View
          style={{
            backgroundColor: 'white',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: height - 50,
            width: Dimensions.get('window').width,
          }}>
          <TouchableOpacity onPress={handleChoosePhoto}>
            <Image
              source={require('../../../assets/images/add-image-icon.png')}
              style={postFormStyles.keyboardToolBarImage}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default PostForm;
