import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function Landing(props) {
	const [state, setstate] = useState('');
	const [redirect, setRedirect] = useState(false);
	return !redirect ? (
		<div>
			<label htmlFor=''>
				Join or Create a room!
				<input onChange={e => setstate(e.target.value)} type='text' />
			</label>
			<button onClick={() => setRedirect(!redirect)}>Join</button>
		</div>
	) : (
		<Redirect to={`/room/${state}`} />
	);
}
