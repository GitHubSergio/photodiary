// Imports
import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  InputAccessoryView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import postFormStyles from './postFormStyles';

// Components
import InputField from '../../shared/input-field/InputField';

const PostForm = ({ title, description, handleChoosePhoto }) => {
  const inputAccessoryViewID = 'inputAccessoryView1';

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
