import app, { firestore } from 'firebase/app';
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

const urlPath =
	process.env.NODE_ENV !== 'production'
		? 'http://www.google.com'
		: 'triviaGame.com';

class Firebase {
	constructor() {
		app.initializeApp(firebaseConfig);
		this.auth = app.auth();
		this.database = app.firestore();
	}
	// *** Auth API ***

	doCreateUserWithEmailAndPassword = async (email, password) => {
		await this.auth.createUserWithEmailAndPassword(email, password);
	};

	doSignInWithEmailAndPassword = async (email, password) => {
		const response = await this.auth
			.setPersistence('local')
			.then(() => this.auth.signInWithEmailAndPassword(email, password));
		return response.user;
	};
	doSignInAnon = async () => {
		const response = await this.auth.signInAnonymously();
		return response.user;
	};

	doSignOut = () => this.auth.signOut();

	doUpdateUserInfo = async ({ displayName }) => {
		const user = this.auth.currentUser;
		await user.updateProfile({
			displayName
		});
		return user;
	};
	// *** Database API ***
	doRoomListen = (roomId, callback) => {
		return this.database
			.collection('rooms')
			.doc(roomId)
			.onSnapshot(callback);
	};
	doUsersListen = (roomId, callback) => {
		return this.database
			.collection('rooms')
			.doc(roomId)
			.collection('users')
			.onSnapshot(callback);
	};
	doGrabGames = async () => {
		const snapshot = await this.database.collection('games').get();
		return snapshot.docs.map(doc => doc.data());
	};
	doUpdateRoom = (roomId, payload) => {
		this.database
			.collection('rooms')
			.doc(roomId)
			.update({ ...payload });
	};
	doCreateRoom = async (roomName, hostUser) => {
		const room = await this.database.collection('rooms').add({
			roomName: roomName,
			hostId: hostUser.id,
			url: `${urlPath}`,
			currentQuestion: {
				question: '',
				choices: [],
				answer: ''
			}
		});
		room.update({
			id: room.id
		});
		await this.doAddUserToRoom(room.id, hostUser);
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
		return await this.database
			.collection('rooms')
			.doc(roomId)
			.collection('users')
			.doc(user.id)
			.set({
				id: user.id,
				name: user.name,
				roomId: roomId,
				score: 0
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
		await this.database
			.collection('rooms')
			.doc(roomId)
			.collection('users')
			.doc(userId)
			.update({ ...payload });
	};
	doUserScore = async ({ roomId, userId, score } = {}) => {
		return await this.database
			.collection('rooms')
			.doc(roomId)
			.collection('users')
			.doc(userId)
			.update({ score: firestore.FieldValue.increment(score) });
	};
	doAddUserResponse = async ({ roomId, userId, payload } = {}) => {
		return await this.database
			.collection('rooms')
			.doc(roomId)
			.collection('users')
			.doc(userId)
			.update({ responses: firestore.FieldValue.arrayUnion({ ...payload }) });
	};
}

export default Firebase;
