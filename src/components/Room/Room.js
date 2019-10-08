import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scoreboard from './Scoreboard';
import Question from './Question';
import { withFirebase } from '../firebase';

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
		const { fireBase } = this.props;
		const { id: roomId } = this.props.match.params;
		debugger;
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
				{/* <h1>{this.state.name}</h1>
				{/* <h1>{this.state.currentQuestion}?</h1> */}
				{/* <Question question={this.state.currentQuestion} /> */}
				<Scoreboard users={this.state.users} />
				<button onClick={this.handleScore}>Hello</button>
			</div>
		);
	}
}
export default withFirebase(Room);
