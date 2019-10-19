import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Container, ImageContainer } from './HomeCss';

const theme = {
	font: 'Raleway'
};

const Homepage = () => {
	return (
		<ThemeProvider theme={theme}>
			<Container>
				<ImageContainer src='game.png' alt='trivia game' />
			</Container>
		</ThemeProvider>
	);
};

export default Homepage;
