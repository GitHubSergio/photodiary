// Imports
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import postsListItemStyles from './postsListItemStyles';

// Components
import Loader from '../../shared/loader/Loader';

const PostsListItem = ({ title, description, postId, imageUri }) => {
  const navigation = useNavigation();
  const [progressiveImage, setProgressiveImageState] = useState(false);

  return (
    <TouchableOpacity
      style={postsListItemStyles.postItemContainer}
      onPress={() =>
        navigation.navigate('PostDetailsScreen', { title, postId })
      }>
      <View style={postsListItemStyles.imgView}>
        {progressiveImage && (
          <View style={postsListItemStyles.imgLoaderView}>
            <Loader />
          </View>
        )}
        <Image
          onLoadStart={() => setProgressiveImageState(true)}
          onLoadEnd={() => setProgressiveImageState(false)}
          style={postsListItemStyles.postItemImg}
          source={{ uri: imageUri }}
          resizeMode="cover"
        />
      </View>
      <View style={postsListItemStyles.contentsView}>
        <View style={postsListItemStyles.titleView}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={postsListItemStyles.title}>
            {title}
          </Text>
        </View>
        <View style={postsListItemStyles.descriptionView}>
          <Text numberOfLines={5} ellipsizeMode="tail">
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostsListItem;
