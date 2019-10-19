import React, { useState } from 'react';
import { AddCircle, Room, Gamepad } from '@material-ui/icons';
import {
	Button,
	TextField,
	InputLabel,
	Select,
	MenuItem
} from '@material-ui/core';
import styled from 'styled-components';
export default function HostPanel({
	children,
	setFormHidden,
	isFormHidden,
	sendNewRoomName,
	room,
	savedGames,
	loadGame
}) {
	const [newRoomName, setNewRoomName] = useState('');
	const [isRoomInputActive, setRoomInput] = useState(false);
	const [isSavedGamesInputActive, setSavedGameInput] = useState(false);
	const [currentGame, setCurrentGame] = useState('');
	return (
		<HostPanelElement
			{...{ isRoomInputActive, isSavedGamesInputActive }}
			className='host_panel'>
			<h1 id='roomname'>{room.roomName}</h1>
			<div className='host_panel_actions'>
				<Button
					variant='outlined'
					startIcon={<AddCircle />}
					onClick={() => {
						setFormHidden(!isFormHidden);
						setRoomInput(false);
						setSavedGameInput(false);
					}}>
					Question
				</Button>
				<Button
					variant='outlined'
					startIcon={<Room />}
					onClick={() => {
						setFormHidden('false');
						setRoomInput(!isRoomInputActive);
						setSavedGameInput(false);
					}}>
					Room Name
				</Button>
				<Button
					variant='outlined'
					startIcon={<Gamepad />}
					onClick={() => {
						setSavedGameInput(!isSavedGamesInputActive);
						setCurrentGame();
						setFormHidden('false');
						setRoomInput(false);
					}}>
					Load Game
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
				<div className='saved_games'>
					<InputLabel htmlFor='game'>Games</InputLabel>
					<Select
						value={currentGame || ''}
						placeholder='Saved'
						required
						onChange={e => {
							setCurrentGame(e.target.value);
						}}
						inputProps={{ name: 'gameSelect', id: 'game' }}>
						{savedGames &&
							savedGames.map((game, i) => {
								return (
									<MenuItem
										key={i}
										style={{ textTransform: 'capitalize' }}
										value={game}>
										{game.name}
									</MenuItem>
								);
							})}
					</Select>
					<Button
						variant='contained'
						onClick={() => {
							setSavedGameInput(false);
							loadGame(currentGame);
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
	.saved_games {
		margin: auto;
		width: 200px;
		flex-direction: column;
		display: ${({ isSavedGamesInputActive }) =>
			isSavedGamesInputActive ? 'flex' : 'none'};
	}
	@media (max-width: 768px) {
		#roomname {
			font-size: 3.2rem;
		}
	}
	.host_panel_actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: 10px 5px;
		> button {
			margin: 2px;
		}
	}
	.host_panel_inputs {
		margin: 10px;
	}
`;
