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

**LoginScreen**

Simple login form with two TextInputs. It interacts with RNF to verify that a user exists. 
Thoughts: This is the simplest and most basic way to use RNF. I think it works really well for this simple operations. I found that the most important part is to setup solid rules for the DB to ensure that only authenticated users can access their data

There is a base InputField component that accepts props from styles to a customHook “useInput”
Thoughts: Nothing really unusual on this it was like creating a base InputField from the <input /> tag in React Web. Nice to implement a custom hooks for value and onChangeText.

This login form is also reused for the signup screen. It renders two additional fields based on the route name extracted with the hook useRoute. 
Thoughts: In an official project I would definitely create separate forms. After all the logic for the two forms may change and it would make it harder to manage and test. 

PostsScreen

This has a very basic usage of the FlatList. I create a button to navigate to the PostAddScreen which uses an absolute position (Twitter like).
Thoughts: I played a lot with the useEffect in here and with useIsFocused and useNavigation hooks from react navigation. These hooks helped to trigger different redux actions based on the redux state also extracted using useSelector hook from redux

Add useEffect code from PostsList 
