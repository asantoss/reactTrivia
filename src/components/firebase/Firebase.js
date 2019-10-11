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

	doCreateUserWithEmailAndPassword = async (email, password) => {
		await this.auth.createUserWithEmailAndPassword(email, password);
	};

	doSignInWithEmailAndPassword = async (email, password) => {
		const response = await this.auth.signInWithEmailAndPassword(
			email,
			password
		);
		return response.user;
	};

	doSignOut = () => this.auth.signOut();

	doUpdateUserInfo = async ({ displayName }) => {
		const user = this.auth.currentUser;
		debugger;
		await user.updateProfile({
			displayName
		});
		debugger;
		return user;
	};
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
		const query = await this.database
			.collection('rooms')
			.doc(roomId)
			.collection('users').where('id', '==', userId).get()
		const doc = await query.docs
		const userDocument = doc[0]
		await this.database.collection('/rooms').doc(roomId).collection('users').doc(userDocument.id).update({ ...payload })
	};
}

export default Firebase;
