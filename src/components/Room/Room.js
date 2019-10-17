import React, { Component } from 'react';
import HostView from './HostView';
import { Redirect } from 'react-router-dom';
import UserUi from './UserUI';
import { withFirebase } from '../firebase';
class Room extends Component {
	state = {
		users: [],
		room: null,
		isHost: false
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
			if (!usersFromDb.some(e => user.id === e.id) && user.isLoggedIn) {
				fireBase.doAddUserToRoom(roomId, user);
			}
			this.setState(prevState => ({ ...prevState, users: [...usersFromDb] }));
		});
		this.roomUnsub = this.props.fireBase.doRoomListen(roomId, room => {
			const roomObj = room.data();
			roomObj.hostId === this.props.user.id && this.setState({ isHost: true });
			this.setState({ room: { ...roomObj } });
		});
	}
	componentWillUnmount() {
		this.userUnsub();
		this.roomUnsub();
	}

	submitUserResponse = async response => {
		const { room } = this.state;
		const { user, fireBase } = this.props;
		if (
			response.userAnswer.toLowerCase() ===
			room.currentQuestion.answer.toLowerCase()
		) {
			await fireBase.doUserScore({
				roomId: room.id,
				userId: user.id,
				score: 20
			});
		}
		await fireBase.doAddUserResponse({
			roomId: room.id,
			userId: user.id,
			payload: response
		});
	};
	// changeHost = hostId => {
	// 	const { fireBase } = this.props;
	// };
	render() {
		const { room, users } = this.state;
		const { isLoggedIn } = this.props.user;

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
