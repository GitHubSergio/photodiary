// Imports
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import postImageStyles from './postImageStyles';

// Components
import Loader from '../../shared/loader/Loader';

const PostImage = ({ uri, handleDeletePhoto, handleDeleteImageOnEdit }) => {
  const [progressiveImage, setProgressiveImageState] = useState(false);

  const handleDeleteImage = () => {
    if (uri.startsWith('file://')) {
      handleDeletePhoto();
    } else {
      handleDeleteImageOnEdit();
    }
  };

  return (
    <View>
      {!!uri && (
        <TouchableOpacity
          style={postImageStyles.deleteBtnContainer}
          onPress={handleDeleteImage}>
          <Text style={postImageStyles.deleteBtnText}>X</Text>
        </TouchableOpacity>
      )}
      {progressiveImage && (
        <View style={postImageStyles.loaderContainer}>
          <Loader />
        </View>
      )}
      <Image
        onLoadStart={() => setProgressiveImageState(true)}
        onLoadEnd={() => setProgressiveImageState(false)}
        style={postImageStyles.img}
        source={{ uri }}
        resizeMode="cover"
      />
    </View>
  );
};

export default PostImage;
