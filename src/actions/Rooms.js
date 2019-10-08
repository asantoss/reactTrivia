import App from '../Firebase';

export const addRoom = room => async dispatch => {
	console.log('dispatched');
	App.doAddRoom(room);
};

export const fetchRoms = () => async dispatch => {
	App.database.on('value', snapshot => {
		dispatch({
			type: 'FETCH_ROOMS',
			payload: snapshot.val()
		});
	});
};
