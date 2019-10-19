import { combineReducers } from 'redux';
import authReducers from './authReducers';
import roomReducer from './roomReducers';

export default combineReducers({
  user: authReducers,
  room: roomReducer,
});

