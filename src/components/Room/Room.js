import React, { Component } from 'react';
import db from '../../Firebase';
import { connect } from 'react-redux';
import Scoreboard from './Scoreboard';
import Question from './Question';

class Room extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			users: [],
			currentQuestion: {}
		};
	}
	async componentDidMount() {
		console.log(this.props.match.params.id);

		const room = await db.doMatchRoomInfo(this.props.match.params.id);

		this.setState(prevState => ({
			...prevState,
			...room
		}));
	}
	render() {
		const { match } = this.props;
		return (
			<div>
				<h1>{this.state.name}</h1>
				<Question question={this.state.currentQuestion} />
				<Scoreboard users={this.state.users} />
				<button onClick={() => console.log(match)}>Hello</button>
			</div>
		);
	}
}

const mapState = state => ({
	...state
});
const mapDispatch = dispatch => ({});

export default connect(
	mapState,
	mapDispatch
)(Room);
