import { combineReducers } from 'redux';
import user from './userReducer';
import article from './articleReducer';
import app from './appReducer';
import page from './pageReducer';
import comment from './commentReducer';

export default combineReducers({
  user: user,
  article: article,
  app: app,
  page: page,
  comment: comment
});