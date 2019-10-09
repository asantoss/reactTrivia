const initialState = {
	name: '',
	id: '',
	rooms: [],
	score: 0
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case 'LOGIN':
			return {
				...state,
				...payload
			};
		case 'LOGOUT':
			return {
				name: '',
				id: '',
				isLoggedIn: false,
				score: 0
			};
		default:
			return state;
	}
}
