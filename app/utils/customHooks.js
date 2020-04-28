// Imports
import { useState } from 'react';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

// Actions
import {
  selectImageFromDeviceFailure,
  selectImageFromDeviceRequest,
  selectImageFromDeviceSuccess as imageFromDeviceSuccess,
} from '../redux/actions/postsActions';

export const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChangeText: (text) => setValue(text),
  };
};

export const useImagePicker = () => {
  const dispatch = useDispatch();
  const [imageUriDevice, setImageUri] = useState();

  const options = {
    title: 'Select Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    permissionDenied: {
      title: 'Camera Access',
      text: 'Need permission to access the camera',
    },
  };

  const handleChoosePhoto = () => {
    dispatch(selectImageFromDeviceRequest(true));
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        dispatch(selectImageFromDeviceFailure('Select image cancelled'));
      } else if (response.error) {
        dispatch(selectImageFromDeviceFailure(response.error));
      } else {
        dispatch(imageFromDeviceSuccess('success'));
        if (response) {
          console.log(response);
          const photoPath =
            Platform.OS === 'ios' ? response.uri : `file://${response.path}`;
          setImageUri(photoPath);
        }
      }
      dispatch(selectImageFromDeviceRequest(false));
    });
  };

  const handleDeletePhoto = () => {
    setImageUri();
  };

  return [imageUriDevice, handleChoosePhoto, handleDeletePhoto];
};
