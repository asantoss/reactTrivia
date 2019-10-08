import React, { createContext } from 'react';

export const FirebaseContext = createContext(null);

export const withFirebase = Component => props => (
	<FirebaseContext.Consumer>
		{firebase => <Component {...props} fireBase={firebase} />}
	</FirebaseContext.Consumer>
);
