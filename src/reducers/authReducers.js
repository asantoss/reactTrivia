const initialState = {
	name: '',
	id: '',
	isLoggedIn: false
};

const authReducer = (state = initialState, action) => {
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
		case 'REDIRECT_TO_SIGNIN':
			return {
				...state,
				...payload
			};
		default:
			return state;
	}
};

export default authReducer;
