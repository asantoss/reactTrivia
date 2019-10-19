import React, { Component } from 'react';
import HostView from './HostView';
import { Redirect } from 'react-router-dom';
import UserUi from './UserUI';

import { withFirebase } from '../firebase';

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

class Room extends Component {
	state = {
		users: [],
		room: null,
		isHost: false,
		isLoggedIn: true
	};
	componentDidMount() {
		if (!this.props.match.params.id) return;
		if (!this.props.user.id) {
			this.setState({ isLoggedIn: false });
		}
		const { user, fireBase } = this.props;
		const { id: roomId } = this.props.match.params;
		this.userUnsub = fireBase.doUsersListen(roomId, res => {
			const usersFromDb = res.docs.map(e => e.data());
			if (!usersFromDb.includes(user) && user.id) {
				fireBase.doAddUserToRoom(roomId, user).then(() =>
					this.setState(prevState => ({
						...prevState,
						users: [...usersFromDb]
					}))
				);
			} else {
				this.setState(prevState => ({ ...prevState, users: [...usersFromDb] }));
			}
		});
		this.roomUnsub = this.props.fireBase.doRoomListen(roomId, room => {
			const roomObj = room.data();
			roomObj.hostId === this.props.user.id && this.setState({ host: true });
			this.setState({ room: { ...roomObj } });
		});
	}
	componentWillUnmount() {
		this.userUnsub();
		this.roomUnsub();
	}

	submitUserResponse = response => {
		const { room } = this.state;
		const { user, fireBase } = this.props;
		if (response.userAnswer === room.currentQuestion.answer) {
			fireBase.doUserScore({ roomId: room.id, userId: user.id, score: 20 });
		}
		fireBase.doAddUserResponse({
			roomId: room.id,
			userId: user.id,
			payload: response
		});
	};
	// changeHost = hostId => {
	// 	const { fireBase } = this.props;
	// };
	render() {
		const { room, users, isLoggedIn } = this.state;

		if (room && isLoggedIn) {
			return this.state.isHost ? (
				<div>
					<HostView room={room} users={users} />
				</div>
			) : (
				<UserUi
					room={room}
					submitResponse={this.submitUserResponse}
					users={users}
				/>
			);
		} else if (isLoggedIn === false && room) {
			return (
				<Redirect
					push
					to={{ pathname: '/signin', state: { from: `/rooms/${room.id}` } }}
				/>
			);
		} else {
			return <div>Loading..</div>;
		}
	}
}
export default withFirebase(Room);
