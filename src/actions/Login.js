export const login = ({ email, password } = {}) => dispatch => {
	dispatch({
		type: 'LOGIN',
		payload: { email, password }
	});
};



