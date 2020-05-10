# Photodiary - iOS/Android

Purpose of this project:

- Explore RNFirebase
- Explore the new react navigation V5 including hooks and implementing unit tests for it
- Explore enzyme vs react-native-testing-library vs @testing-library/react-native
- Explore react-native-image-picker from the react native community (created a customHook for it)
- Explore redux hooks useDispatch and useSelector
- Setup Hermes engine for Android
- Use Flipper for debugging
- During the project I also took on board the challenge to implement InputAccessoryView for Android

I built this app to play with the points in the above list. It started with RN 0.61 and I then upgraded it to RN 0.62.2. Definitely not an app ready for production but
good project to experiment and explore. Below I listed some highlights that I enjoyed exploring and some personal comments.

## LoginScreen

Simple login form with two TextInputs. It interacts with RNF to verify that a user exists.

**Comments**: This is the simplest and most basic way to use RNF. I think it works really well for this simple apps. I found that the most important part is to setup
solid rules for the DB to ensure that only authenticated users can access their data

There is a base InputField component that accepts props, e.g styles, a customHook **useInput**, secureTextEntry and onSubmitEditing props.

```
const InputField = ({
  style,
  placeHolder,
  inputValue,
  onSubmitEditing,
  ...rest
}) => {
  return (
    <TextInput
      style={[inputFieldStyles.textInput, style]}
      placeholder={placeHolder}
      placeholderTextColor="grey"
      onSubmitEditing={onSubmitEditing}
      {...inputValue}
      {...rest}
    />
  );
};
```

```
export const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChangeText: (text) => setValue(text),
  };
};
```

**Comments**: Nothing really unusual on this it was like creating a base InputField from the <input /> tag in React Web. Nice to implement a custom hooks for the field
**value** and **onChangeText**.

This login form is also reused for the signup screen. It renders two additional fields based on the route name extracted with the hook **useRoute**.

```
...
const { name } = useRoute();
const isSignUpScreen = name === 'SignUpScreen';
...
const email = useInput('');
const password = useInput('');
...
return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior="position"
        enabled
        keyboardVerticalOffset={70}>
        <Logo />

        {isSignUpScreen && (
          <InputField
            accessibilityLabel="username"
            placeHolder="Username"
            inputValue={displayName}
            onSubmitEditing={handleSubmit}
          />
        )}

        <InputField
          accessibilityLabel="email"
          placeHolder="Email"
          inputValue={email}
          onSubmitEditing={handleSubmit}
          keyboardType={'email-address'}
        />
        <InputField
          accessibilityLabel="password"
          placeHolder="Password"
          inputValue={password}
          onSubmitEditing={handleSubmit}
          secureTextEntry
        />
        ...
```

**Comments**: In an official project I would definitely create separate forms. After all the logic for the two forms may change and it would make it harder to manage and
test but it was useful to test the **useRoute** hook from the react navigation.

![Alt text](./app/assets/screenshots/ios-login.png)
![Alt text](./app/assets/screenshots/SignUpiOS.png)

## PostsScreen

This has a very basic usage of the FlatList with data fetched from firestore. I create a button to navigate to the PostAddScreen which uses an absolute position (Twitter
like). I used this screen to play with the useEffect hook when navigating back and forth from the screen. E.g. navigating back after creating a new post or updating and
deleting a post.

```
  ...
  const { email } = useSelector((state) => state.user.userDetails);
  const { allPosts } = useSelector((state) => state.posts);
  const { isFetching } = useSelector((state) => state.posts);
  const { createPostSuccess } = useSelector((state) => state.posts);
  const { deletePostSuccess } = useSelector((state) => state.posts);
  const { updatePostSuccess } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (email) {
      dispatch(getAllPosts());
      console.log('USEEFFECT ONE');
    }
  }, [dispatch, email]);

  useEffect(() => {
    if (isFocused && createPostSuccess) {
      console.log('USEEFFECT IF ONE');
      dispatch(clearPostsSuccess(0));
      dispatch(getAllPosts());
    }

    if (updatePostSuccess) {
      console.log('USEEFFECT IF TWO');
      dispatch(clearUpdatePostSuccess(0));
      dispatch(getAllPosts());
    }

    if (isFocused && deletePostSuccess) {
      console.log('USEEFFECT IF THREE');
      dispatch(clearDeletePostSuccess(0));
      dispatch(getAllPosts());
    }
  }, [
    isFocused,
    createPostSuccess,
    deletePostSuccess,
    updatePostSuccess,
    dispatch,
  ]);
  ...
```

**Comments**: I played a lot with the useEffect in here and with **useIsFocused** and **useNavigation** hooks from react navigation. These hooks helped to trigger
different
redux actions based on the redux state also extracted using **useSelector** hook from redux

![Alt text](./app/assets/screenshots/PostsListAndroid.png)

## PostAddScreen

Here to explore the image picker from the RNCommunity. To select an image I created a custom hook **useImagePicker**.

```
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
```

Also set the challenge of creating a keyboard toolbox for Android (InputAccessoryView for iOS).
To position the KTB on top of the android keyboard I implemented two event listeners **keyboardDidShow** and **keyboardDidHide** in an useEffect hook. The new post is
saved to firestore and the user redirected back to the PostsScreen where the list of posts is fetched again from firestore. Images are saved to the firebase storage.

```
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
```

and fired a function to grab the keyboard height minus the height of the View creating the toolbox

```
const keyboardDidShow = (e) => {
    setToolbarPosition(e.endCoordinates.height - 50);
    setIsKeyboardOpen(!isKeyboardOpen);
  };
```

Few screens from iOS and Android

![Alt text](./app/assets/screenshots/AddPostAndroid.png)
![Alt text](./app/assets/screenshots/AllowAccessAndroid.png)
![Alt text](./app/assets/screenshots/SelectPhotoAndroid.png)
![Alt text](./app/assets/screenshots/SelectPhotoiOS.png)
![Alt text](./app/assets/screenshots/AddPostWithPhotoiOS.png)

## PostDetailsScreen

This screen shows details of the post and a menu with position absolute which opens showing a **X** to delete and an **E** to navigate to the edit screen.
Nothing overly completed but I used this screen also to play around with hooks when navigating back and forth. The post details are filtered from the PostsScreen list.

```
useEffect(() => {
    if (isFocused) {
      dispatch(
        getPostDetails(
          allPosts.find((post) => post.postId === route.params.postId),
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  useEffect(() => {
    if (deletePostSuccess) {
      navigation.goBack();
    }

    return () => {
      dispatch(clearPostsDetails({}));
    };
  }, [deletePostSuccess, dispatch, navigation]);

  const handleDeletePost = () => {
    const { postId } = postDetails;
    alertFactory('Delete Post', 'Are you sure you want to delete this post?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        onPress: () => dispatch(deletePost(postId, postDetails.imageId)),
      },
    ]);
  };

  const handleEditPost = () => {
    navigation.navigate('UpdatePostDetailsScreen');
    dispatch(isEditingPost(true));
  };
```

Few screens from iOS and Android

![Alt text](./app/assets/screenshots/PostDetailsAndroid.png)
![Alt text](./app/assets/screenshots/DeletePostAlertAndroid.png)
![Alt text](./app/assets/screenshots/EditPostAndroid.png)
![Alt text](./app/assets/screenshots/PostDetailsiOS.png)
![Alt text](./app/assets/screenshots/DeletePostAlertiOS.png)
![Alt text](./app/assets/screenshots/EditPostiOS.png)

## Testing Libraries

I work on a daily basis with jest & enzyme, so the most natural solution was to implement tests with both. As for the enzyme documentation there are some limitation for
RN therefore I looked into other solutions. I explored the react testing library for the web from Kent C. Dodds and found out that there is an implementation for RN and
based on the same principles [@testing-library/react-native](https://www.native-testing-library.com/).
I also found [react-native-testing-library](https://callstack.github.io/react-native-testing-library/) from callstack.com. After having compared the the two library for
RN I decided to go for the one from Kent Dodds as I was just more comfortable with the api and it's closer to the principles of the one used for the web. Some part
of the documentation may need updating e.g. mocking react navigation seems to be referring to V4 but I found this article [Testing your react-navigation v5 hooks](https://medium.com/@dariaruckaolszaska/testing-your-react-navigation-5-hooks-b8b8f745e5b6) and used that implementation.

```
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MockTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Posts" component={PostsStackMain} />
        <Tab.Screen name="Settings" component={SettingsStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
const MockedStackNavigator = ({
  routeOne,
  componentOne,
  optionsOne = { headerTitle: 'LOG IN' },
  routeTwo,
  componentTwo,
  optionsTwo = { headerTitle: 'SIGN UP' },
  params = {},
}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={routeOne}
          component={componentOne}
          initialParams={params}
          options={{ ...optionsOne }}
        />
        <Stack.Screen
          name={routeTwo}
          component={componentTwo}
          initialParams={params}
          options={{ ...optionsTwo }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MockNavigation = ({ user = {} }) => {
  return !user ? (
    <MockedStackNavigator
      routeOne="LoginScreen"
      componentOne={LoginScreen}
      routeTwo="SignUpScreen"
      componentTwo={LoginScreen}
    />
  ) : (
    <MockTabNavigator />
  );
};
```

Some tests for the navigation

```
it('should navigate from the posts tab to the settings tabs', () => {
      const { getByText } = renderWithRedux(<MockNavigation user />);
      fireEvent.press(getByText('Settings'));
      const postsHeader = getByText('SETTINGS');
      expect(postsHeader).toBeTruthy();
    });

it('should navigate to the Sign Up screen', async () => {
      const { getByText, getByLabelText } = renderWithRedux(
        <MockedStackNavigator
          routeOne="LoginScreen"
          componentOne={LoginScreen}
          routeTwo="SignUpScreen"
          componentTwo={LoginScreen}
        />,
      );
      const goToSignUpButton = getByLabelText('switch-btn');
      fireEvent.press(goToSignUpButton);
      const signUpHeader = getByText('SIGN UP');
      expect(signUpHeader).toBeTruthy();
      const usernameField = getByLabelText('username');
      expect(usernameField).toBeTruthy();
    });
```

Also to test hooks I implemented [react-hooks-testing-library](https://react-hooks-testing-library.com/), below a couple of tests

```
describe('useInput', () => {
    it('should return the text value', () => {
      const testText = 'new text';
      const { result } = renderHook(() => useInput(testText));
      expect(result.current.value).toEqual(testText);
    });

    it('should update the text value', () => {
      let initialValue = 'default text';
      const { result } = renderHook(() => useInput(initialValue));

      initialValue = 'new text';

      act(() => {
        result.current.onChangeText(initialValue);
      });

      expect(result.current.value).toEqual('new text');
    });
  });
```
