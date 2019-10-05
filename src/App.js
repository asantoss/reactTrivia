import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/pages/Landing';
import Room from './components/Room/Room';

function App() {
	return (
		<Router>
			<div className='App'>
				<NavBar />
				<Route path='/rooms/:id' component={Room} />
				<Route exact path='/' component={Landing} />
			</div>
		</Router>
	);
}

export default App;
