import React, { Component } from 'react';
import fireBase from '../../Firebase';
import { connect } from 'react-redux';
import Scoreboard from './Scoreboard';
import Question from './Question';

class Room extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			users: [],
			currentQuestion: ''
		};
	}
	componentDidMount() {
		fireBase.doAddRoom('Party room', this.props.user);
		const { id: roomId } = this.props.match.params;
		fireBase.doMatchRoomInfo(roomId).then(snapshot => {
			this.setState(prevState => ({
				...prevState,
				...snapshot
			}));
		});
		// *** Room data listener for updating currentQuestion.
		fireBase.database
			.collection('rooms')
			.doc(roomId)
			.onSnapshot(room => {
				this.setState(prevState => ({ ...prevState, ...room.data() }));
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
		const { match } = this.props;
		return (
			<div>
				<h1>{this.state.name}</h1>
				<h1>{this.state.currentQuestion}?</h1>
				{/* <Question question={this.state.currentQuestion} /> */}
				<Scoreboard users={this.state.users} />
				<button onClick={this.handleScore}>Hello</button>
			</div>
		);
	}
}

const mapState = ({ ...state } = {}) => ({
	...state
});
const mapDispatch = dispatch => ({
	playerScore: () => {
		dispatch({ type: 'PLAYER_SCORE' });
	}
});

export default connect(
	mapState,
	mapDispatch
)(Room);
