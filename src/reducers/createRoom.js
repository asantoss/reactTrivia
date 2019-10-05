import App from '../Firebase';

export default async (state = { rooms: [] }, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'CREATE_ROOM':
			App.doAddRoom(payload.name);
			return {
				...state,
				rooms: [payload]
			};
		default:
			return state;
	}
};
