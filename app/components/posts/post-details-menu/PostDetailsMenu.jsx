// Imports
import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import postDetailsMenuStyles from './postDetailsMenuStyles';

const MenuBaseButton = ({ handleToggleMenu }) => {
  return (
    <TouchableOpacity
      onPress={handleToggleMenu}
      style={postDetailsMenuStyles.menuBaseButtonContainer}>
      <View style={postDetailsMenuStyles.menuBaseButtonBar} />
      <View style={postDetailsMenuStyles.menuBaseButtonBar} />
      <View style={postDetailsMenuStyles.menuBaseButtonBar} />
    </TouchableOpacity>
  );
};

const DeleteButton = ({ handleDeletePost }) => {
  return (
    <TouchableOpacity
      onPress={handleDeletePost}
      style={postDetailsMenuStyles.menuDeleteButton}>
      <Text style={postDetailsMenuStyles.menuButtonsText}>X</Text>
    </TouchableOpacity>
  );
};

const EditButton = ({ handleEditPost }) => {
  return (
    <TouchableOpacity
      onPress={handleEditPost}
      style={postDetailsMenuStyles.menuEditButton}>
      <Text style={postDetailsMenuStyles.menuButtonsText}>E</Text>
    </TouchableOpacity>
  );
};

const PostDetailsMenu = ({ handleDeletePost, handleEditPost }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <>
      {toggleMenu && (
        <>
          <EditButton handleEditPost={handleEditPost} />
          <DeleteButton handleDeletePost={handleDeletePost} />
        </>
      )}
      <MenuBaseButton handleToggleMenu={handleToggleMenu} />
    </>
  );
};

export default PostDetailsMenu;
