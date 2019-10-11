import React, { useEffect, useState, useContext } from 'react';
import Scoreboard from './Scoreboard';
import Game from './Game';

import { FirebaseContext } from '../firebase';

const Room = props => {
	const [state, setState] = useState({
		users: [],
		roomInfo: null
	});
	const fireBase = useContext(FirebaseContext);
	useEffect(() => {
		if (state.roomInfo !== null) {
			const game = fireBase.database
				.collection('games')
				.doc('TechTrivia')
				.get()
				.then(res => {
					debugger;
					console.log(res);
				});
		}
		const RoomUnsub = fireBase.doRoomListen('UxtXPxyiyuzNLS2OMCjA', room => {
			setState(prevState => ({
				...prevState,
				roomInfo: { ...prevState.roomInfo, ...room.data() }
			}));
		});
		const userUnsub = fireBase.doUsersListen('UxtXPxyiyuzNLS2OMCjA', res => {
			const users = res.docs.map(e => e.data());
			setState(prevState => ({ ...prevState, users: [...users] }));
		});
		return () => {
			userUnsub();
			RoomUnsub();
		};
	}, [setState, fireBase]);
	return (
		<div>
			<Game {...state.roomInfo} />
			<Scoreboard users={state.users} />
		</div>
	);
};

export default Room;
