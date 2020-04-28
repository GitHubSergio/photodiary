import { combineReducers } from 'redux';
import { SIGNING_OUT } from '../action-types';
import userReducer from './userReducer';
import postsReducer from './postsReducer';

const appReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === SIGNING_OUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
