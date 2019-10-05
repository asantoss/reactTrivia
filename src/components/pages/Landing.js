import React, { useState } from 'react';
import { connect } from 'react-redux';
function Landing(props) {
	const [state, setstate] = useState('');
	const createRoom = () => {
		const roomInfo = {
			name: state,
			creator: 'Alexander'
		};
		props.createRoom(roomInfo);
	};
	return (
		<div>
			<label htmlFor=''>
				Join or Create a room!
				<input onChange={e => setstate(e.target.value)} type='text' />
			</label>
			<button onClick={createRoom}>Create</button>
		</div>
	);
}

const mapDispatchToProps = dispatch => ({
	createRoom: payload => dispatch({ type: 'CREATE_ROOM', payload: payload })
});

export default connect(
	null,
	mapDispatchToProps
)(Landing);
