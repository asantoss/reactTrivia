let initialState = {
	rooms: [],
	isAuth: false,
	user: {
		name: 'alex',
		id: `7idh`,
		score: 0
	}
};

const mainReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'CREATE_ROOM':
			return {
				...state,
				rooms: []
			};
		case 'FETCH_ROOMS':
			return {
				...state,
				rooms: [...payload]
			};
		case 'FETCH_ROOM_INFO':
			return {
				...state
			};
		case 'PLAYER_SCORE':
			return {
				...state,
				user: {
					...state.user,
					score: state.user.score + 20
				}
			};
		default: {
			return initialState;
		}
	}
};

export default mainReducer;
