import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/containers/LandingContainer';
import Room from './components/containers/RoomContainer';
import Firebase, { FirebaseContext } from './components/firebase';
<<<<<<< HEAD

import SignUp from './components/containers/SignUpContainer';
import Navbar from './components/NavBar/NavBar'

// import CreateRoomForm from './components/Room/CreateRoomForm';

=======
import Authenticator from './components/containers/AuthenticatorContainer';
import Homepage from './components/pages/Home';
>>>>>>> 9f24ab2bf3fc5b6cafadd4a13c34fc9536bf3c48
function App() {
	return (
		<FirebaseContext.Provider value={new Firebase()}>
			<Router>
				<div className='App'>
<<<<<<< HEAD
					<Navbar />

					<Route path='/rooms/:id' component={Room} />
					<Route exact path='/signup' component={SignUp} />
					<Route exact path='/signin' component={SignUp} />
					<Route exact path='/' component={Landing} />
=======
					<NavBar />
					<Route exact path='/home' component={Homepage} />
					<Route exact path='/' component={Landing} />
					<Route path='/rooms/:id' component={Room} />
					<Route exact path='/signup' component={Authenticator} />
					<Route exact path='/signin' component={Authenticator} />
>>>>>>> 9f24ab2bf3fc5b6cafadd4a13c34fc9536bf3c48
				</div>
			</Router>
		</FirebaseContext.Provider>
	);
}

export default App;
