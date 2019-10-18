import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/containers/LandingContainer';
import Room from './components/containers/RoomContainer';
import Firebase, { FirebaseContext } from './components/firebase';
import Authenticator from './components/containers/AuthenticatorContainer';
import Homepage from './components/pages/Home';
function App() {
	return (
		<FirebaseContext.Provider value={new Firebase()}>
			<Router>
				<div className='App'>
					<NavBar />
					<Route exact path='/home' component={Homepage} />
					<Route exact path='/' component={Landing} />
					<Route path='/rooms/:id' component={Room} />
					<Route exact path='/signin' component={Authenticator} />
					<Route exact path='/signup' component={Authenticator} />
				</div>
			</Router>
		</FirebaseContext.Provider>
	);
}

export default App;
