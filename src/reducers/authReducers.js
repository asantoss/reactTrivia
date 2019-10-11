const initialState = {
	name: '',
	id: '',
	isLoggedIn: false
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
