const initialState = {
	name: '',
	id: '',

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
			console.log('signout success');
			return state;
		default:
			return state;
	}
}


export default authReducer;