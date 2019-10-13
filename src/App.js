import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/containers/LandingContainer';
import Room from './components/containers/RoomContainer';
import Firebase, { FirebaseContext } from './components/firebase';
import Scoreboard from './components/Room/Scoreboard';
import Game from './components/Room/Game';
import Authenticator from './components/containers/AuthenticatorContainer';
import Timer from './components/Room/Timer';
import UserUI from './components/Room/UserUI';

function App() {
	return (
		<FirebaseContext.Provider value={new Firebase()}>
			<Router>
				<div className='App'>
					<NavBar color />
					<Route path='/rooms/:id' component={Room} />
					{/* <Route exact path='/scoreboard' component={Scoreboard} /> */}
					{/* <Route exact path='/profile' component={Game} /> */}
					<Route exact path='/signin' component={Authenticator} />
					<Route exact path='/signup' component={Authenticator} />
					<Route exact path='/' component={Landing} />
					<Route exact path='/userUI' component={UserUI} />
					<Route exact path='/scoreboard' component={Scoreboard} />
				</div>
			</Router>
		</FirebaseContext.Provider>
	);
}

export default App;
