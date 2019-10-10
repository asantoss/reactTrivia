import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scoreboard from './Scoreboard';
import Game from './Game';

import { withFirebase } from '../firebase';

class Room extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			roomInfo: null
		};
	}
	componentDidMount() {
		const { fireBase } = this.props;
		const { id: roomId } = this.props.match.params;
		// *** Room data listener for updating currentQuestion.
		fireBase.database
			.collection('rooms')
			.doc(roomId)
			.onSnapshot(room => {
				this.setState(prevState => ({
					...prevState,
					roomInfo: { ...prevState.roomInfo, ...room.data() }
				}));
			});
		// *** Users data listener for updating the score.
		fireBase.database
			.collection('rooms')
			.doc(roomId)
			.collection('users')
			.onSnapshot(res => {
				const users = res.docs.map(e => e.data());
				this.setState(prevState => ({ ...prevState, users: [...users] }));
			});
	}

	handleScore = () => {
		const { fireBase } = this.props;
		const { id: roomId } = this.props.match.params;
		const { id: userId, score } = this.props.user;
		debugger;
		this.props.playerScore();
		fireBase.doUpdateUser({
			roomId,
			userId,
			payload: { ...this.props.user, score: score + 20 }
		});
	};
	render() {
		return (
			<div>
				<Game {...this.state.roomInfo} />
				<Scoreboard users={this.state.users} />
			</div>
		);
	}
}
export default withFirebase(Room);
