import React, { useEffect, useState, useContext } from 'react';
import HostView from './HostView';
import Game from './Game';

import { FirebaseContext, withFirebase } from '../firebase';

// const Room = ({ user, match }) => {
// 	const [users, setUsers] = useState([]);
// 	const [room, setRoom] = useState(null);
// 	const [isHost, setHost] = useState(false);
// 	const fireBase = useContext(FirebaseContext);
// 	useEffect(() => {
// 		const RoomUnsub = fireBase.doRoomListen('UxtXPxyiyuzNLS2OMCjA', room => {
// 			const roomObj = room.data();
// 			debugger;
// 			roomObj.host.id === user.id && setHost(true);
// 			setRoom(prevState => ({ ...prevState, ...roomObj }));
// 		});
// 		const userUnsub = fireBase.doUsersListen('UxtXPxyiyuzNLS2OMCjA', res => {
// 			const usersFromDb = res.docs.map(e => e.data());
// 			setUsers([...usersFromDb]);
// 		});
// 		return () => {
// 			userUnsub();
// 			RoomUnsub();
// 		};
// 	}, [setUsers, setRoom, setHost, fireBase, user]);
// 	debugger;
// 	return isHost ? (
// 		<div>
// 			<HostView room={room} users={users} />
// 		</div>
// 	) : (
// 		<div>
// 			<Game room={room} users={users} />
// 		</div>
// 	);
// };

class Room extends React.Component {
	state = {
		users: [],
		room: null,
		isHost: true
	};
	componentDidMount() {
		if (!this.props.match.params.id) return;
		const { id: roomId } = this.props.match.params;
		this.userUnsub = this.props.fireBase.doUsersListen(roomId, res => {
			const usersFromDb = res.docs.map(e => e.data());
			this.setState(prevState => ({ ...prevState, user: [...usersFromDb] }));
		});
		this.roomUnsub = this.props.fireBase.doRoomListen(roomId, room => {
			const roomObj = room.data();
			roomObj.host.id === this.props.user.id && this.setState({ host: true });
			this.setState({ room: { ...roomObj } });
		});
	}
	componentWillUnmount() {
		this.userUnsub();
		this.roomUnsub();
	}
	render() {
		const { room, users } = this.state;
		// return this.state.isHost ? (
		// 	<div>
		// 		<HostView room={room} users={users} />
		// 	</div>
		// ) : (
		// 	<div>
		// 		<Game room={room} users={users} />
		// 	</div>
		// );
		if (room) {
			debugger;
			return (
				<div>
					<HostView room={room} users={users} />
					<Game room={room} users={users} />
				</div>
			);
		} else {
			return <div>Loading..</div>;
		}
	}
}
export default withFirebase(Room);
