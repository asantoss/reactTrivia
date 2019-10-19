import React, { useState } from 'react';
import { AddCircle, Room } from '@material-ui/icons';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';
export default function HostPanel({
	children,
	setFormHidden,
	isFormHidden,
	sendNewRoomName,
	room
}) {
	const [newRoomName, setNewRoomName] = useState('');
	const [isRoomInputActive, setRoomInput] = useState(false);
	return (
		<HostPanelElement {...{ isRoomInputActive }} className='host_panel'>
			<h1 id='roomname'>{room.roomName}</h1>
			<div className='host_panel_actions'>
				<Button
					variant='outlined'
					startIcon={<AddCircle />}
					onClick={() => {
						setFormHidden(!isFormHidden);
						setRoomInput(false);
					}}>
					Question
				</Button>
				<Button
					variant='outlined'
					startIcon={<Room />}
					onClick={() => {
						setFormHidden('false');
						setRoomInput(!isRoomInputActive);
					}}>
					Room Name
				</Button>
			</div>
			<div className='host_panel_inputs'>
				<div className='room_name_input'>
					<TextField
						placeholder='New Room Name'
						value={newRoomName}
						InputProps={{ disableUnderline: true }}
						onChange={e => setNewRoomName(e.target.value)}
					/>
					<Button
						variant='contained'
						onClick={() => {
							sendNewRoomName(newRoomName);
							setNewRoomName('');
						}}>
						Submit
					</Button>
				</div>
				{children}
			</div>
		</HostPanelElement>
	);
}

const HostPanelElement = styled.div`
	.room_name_input {
		display: ${({ isRoomInputActive }) =>
			isRoomInputActive ? 'block' : 'none'};
	}
	@media (max-width: 768px) {
		#roomname {
			font-size: 3.2rem;
		}
	}
	.host_panel_actions {
		display: flex;
		flex-wrap: wrap;
		margin: 10px 5px;
		> button {
			margin: 2px;
		}
	}
	.host_panel_inputs {
		margin: 10px;
	}
`;
