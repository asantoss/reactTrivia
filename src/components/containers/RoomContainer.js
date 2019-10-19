import { connect } from 'react-redux';
import Room from '../Room/Room';

const mapState = state => {
	return {
		...state
	};
};
const mapDispatch = dispatch => ({
	playerScore: () => {
		dispatch({ type: 'PLAYER_SCORE' });
	},
	redirectToSignIn: payload => {
		dispatch({ type: 'REDIRECT_TO_SIGNIN', payload: { ...payload } });
	}
});

const ReduxConnectedRoom = connect(
	mapState,
	mapDispatch
)(Room);

export default ReduxConnectedRoom;
