import React, { Component } from 'react';
import styled from 'styled-components';

export default class Game extends Component {
	render() {
		const nums = new Array(10);
		return (
			<GameContainer>
				<div className='item'>item</div>
				<div className='item'>item</div>
				<div className='item'>item</div>
				<div className='item'>item</div>
				<div className='item'>item</div>
				<div className='item'>item</div>
			</GameContainer>
		);
	}
}

const GameContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr;
	width: 100vw;
	height: 80vh;
	.item {
	}
`;
