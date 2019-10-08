import { combineReducers } from 'redux';
import authReducers from './authReducers';

// let initialState = {
// 	rooms: [],
// 	isAuth: false
// };

// const mainReducer = (state = initialState, action) => {
// 	const { type, payload } = action;
// 	switch (type) {
// 		case 'PLAYER_SCORE':
// 			return {
// 				...state,
// 				user: {
// 					...state.user,
// 					score: state.user.score + 20
// 				}
// 			};
// 		default: {
// 			return initialState;
// 		}
// 	}
// };

export default combineReducers({ user: authReducers });
