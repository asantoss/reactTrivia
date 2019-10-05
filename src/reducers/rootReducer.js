import { combineReducers } from 'redux';
import authReducers from './authReducers';
import createRoom from './createRoom';

export default combineReducers({
	authReducers,
	createRoom
});
