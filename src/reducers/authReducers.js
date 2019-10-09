const initialState = {
	name: '',
	id: ''
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case 'LOGIN':
			debugger;
			return {
				...state,
				...payload
			};
		case 'LOGOUT':
			return {};
		default:
			return state;
	}
}
