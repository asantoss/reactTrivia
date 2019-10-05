let initialState = {
	rooms: [],
	isAuth: false,
	user: {}
};

const mainReducer = async (state = initialState, action) => {
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
			console.log(payload);

			return {
				...state
			};
		default: {
			return initialState;
		}
	}
};

export default mainReducer;
