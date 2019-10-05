import React, { Component } from 'react';
import Scoreboard from './Scoreboard';
import Question from './Question';

export default class Room extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			users: [],
			currentQuestion: {}
		};
	}
	render() {
		return (
			<div>
				<Question question={this.state.currentQuestion} />
				<Scoreboard users={this.state.users} />
			</div>
		);
	}
}
