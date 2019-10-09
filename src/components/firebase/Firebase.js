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
		return this.auth.createUserWithEmailAndPassword(email, password);
	};

	doSignInWithEmailAndPassword = (email, password) => {
		return this.auth.signInWithEmailAndPassword(email, password);
	};

	doSignOut = () => this.auth.signOut();

	// *** Database API ***

	doCreateRoom = async (roomName, hostUser) => {
		const room = await this.database.collection('rooms').doc();
		room.collection('users').add({ ...hostUser });
		await room.set({ name: roomName, host: { ...hostUser } });
		return room.id;
	};
	doMatchRoomInfo = async roomId => {
		const snapShot = await this.database
			.collection('rooms')
			.doc(roomId)
			.get();
		const roomInfo = snapShot.data();
		const usersSnapshot = await this.database
			.collection('rooms')
			.doc(roomId)
			.collection('users')
			.get();
		const users = usersSnapshot.docs.map(user => user.data());
		return {
			...roomInfo,
			users: users
		};
	};
	doAddUserToRoom = async (roomId, user) => {
		const { id, name } = user;
		await this.database
			.collection('rooms')
			.doc(roomId)
			.collection('users')
			.doc()
			.set({
				...user
			});
	};
	doGetUsersInRoom = async roomId => {
		const snapshot = await this.database
			.collection('rooms')
			.doc(roomId)
			.collection('users')
			.get();
		const users = snapshot.docs.map(user => user.data());
		return users;
	};
	doFetchRooms = async () => {
		const rooms = await this.database.collection('rooms').get();
		console.log(rooms.docs.map(doc => doc.data()));
	};
	doUpdateUser = async ({ roomId, userId, payload } = {}) => {
		this.database
			.collection('rooms')
			.doc(roomId)
			.collection('users')
			.doc(userId)
			.update({ ...payload });
	};
}

export default Firebase;
