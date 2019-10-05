import App from '../Firebase';

export default async (state = { rooms: [] }, action) => {
	const { type, payload } = action;
	switch (type) {

		case 'FETCH_ROOMS':
			const rooms = await App.doFetchRooms();
			return {
				...state,
				rooms: [rooms]
			};

		default:
			return state;
	}
};
