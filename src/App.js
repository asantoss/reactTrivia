import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/pages/Landing';
import Room from './components/containers/RoomContainer';
import Firebase, { FirebaseContext } from './components/firebase';
// import CreateRoomForm from './components/Room/CreateRoomForm';

function App() {
	return (
		<FirebaseContext.Provider value={new Firebase()}>
			<Router>
				<div className='App'>
					<NavBar />
					<Route path='/rooms/:id' component={Room} />
					<Route exact path='/' component={Landing} />
				</div>
			</Router>
		</FirebaseContext.Provider>
	);
}

export default App;
