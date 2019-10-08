import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { withFirebase } from '../firebase';

export class CreateRoomForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			room: {}
		};
	}
	submitCreateRoom = event => {
		event.preventDefault();
		const { room } = this.state;
		const { fireBase } = this.props;
		debugger;
		fireBase.doCreateRoom(room, { name: 'alexander', id: '76868' }).then(res =>
			this.setState(prevState => ({
				...prevState,
				room: {
					...prevState.room,
					id: res
				}
			}))
		);
	};
	onChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState(prevState => ({
			...prevState,
			room: { ...prevState.room, [name]: value }
		}));
	};
	render() {
		return (
			<div>
				{this.state.room.id === undefined ? (
					<div>
						<form action='' onSubmit={this.submitCreateRoom}>
							<label htmlFor='roomName'>Room Name: </label>
							<input
								type='text'
								id='roomName'
								name='name'
								onChange={this.onChange}
							/>
							<button type='submit'>Submit</button>
						</form>
					</div>
				) : (
					<Redirect to={`/rooms/${this.state.room.id}`} />
				)}
			</div>
		);
	}
}

export default withRouter(withFirebase(CreateRoomForm));
