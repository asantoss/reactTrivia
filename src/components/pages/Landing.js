import React, { useState, useEffect } from 'react';
import db from '../../Firebase';

export default function Landing(props) {
	const [state, setstate] = useState('');
	const makeRoom = roomName => {
		db.doAddRoom(state, 'Alexander')
	};
	return (
		<div>
			<label htmlFor=''>
				Join or Create a room!
				<input onChange={e => setstate(e.target.value)} type='text' />
				{props.rooms &&
					props.rooms.map(room => {
						return (
							<div>
								<h1>{room.name}</h1>
							</div>
						);
					})}
			</label>
			<button onClick={makeRoom}>Create</button>
		</div>
	);
}
