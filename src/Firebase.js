import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_ID,
	measurementId: 'G-NXHTNH66CH'
};

class Firebase {
	constructor() {
		app.initializeApp(firebaseConfig);
		this.auth = app.auth();
		this.database = app.firestore();
	}
	// *** Auth API ***

	doCreateUserWithEmailAndPassword = (email, password) => {
		this.auth.createUserWithEmailAndPassword(email, password);
	};

	doSignInWithEmailAndPassword = (email, password) => {
		this.auth.signInWithEmailAndPassword(email, password);
	};

	doSignOut = () => this.auth.signOut();

	// *** Database API ***

	doAddRoom = async (roomName, hostUser) => {
		console.log('ruuning');
		await this.database.collection('rooms').add({
			name: roomName.toLowerCase()
		});
	};
	doMatchRoomInfo = async roomId => {
		const snapShot = await this.database
			.collection('rooms')
			.doc(roomId)
			.get();
		return snapShot.data();
	};

	doFetchRooms = async () => {
		const rooms = await this.database.collection('rooms').get();
		console.log(rooms.docs.map(doc => doc.data()));
	};
}
const App = new Firebase();

export default App;
