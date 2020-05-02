// Imports
import React from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  InputAccessoryView,
  Image,
  Text,
  Keyboard,
} from 'react-native';
import keyboardToolBoxStyles from './keyboardToolBoxStyles';

const ToolBoxButton = ({ handleAction }) => {
  return (
    <View style={keyboardToolBoxStyles.keyboardToolBarContainer}>
      <TouchableOpacity onPress={handleAction}>
        <Image
          source={require('../../../assets/images/add-image-icon.png')}
          style={keyboardToolBoxStyles.keyboardToolBarImage}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Keyboard.dismiss()}>
        <Text style={keyboardToolBoxStyles.keyboardToolBarButtonDoneText}>
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const IOSToolBox = ({ handleAction, iosNativeID }) => (
  <InputAccessoryView nativeID={iosNativeID}>
    <ToolBoxButton handleAction={handleAction} />
  </InputAccessoryView>
);

const KeyboardToolBox = Platform.select({
  ios: ({ handleAction, iosNativeID }) => (
    <IOSToolBox handleAction={handleAction} iosNativeID={iosNativeID} />
  ),
  android: ({ handleAction, isKeyboardOpen }) =>
    isKeyboardOpen && <ToolBoxButton handleAction={handleAction} />,
});

export default KeyboardToolBox;
