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
			console.log('here i am again !!!!!!')
			return {
				...state,
				isLoggedIn: false
			}

		default:
			return state;
	}
}


export default authReducer;