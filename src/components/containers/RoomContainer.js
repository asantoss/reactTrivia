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
	}
});

const ReduxConnectedRoom = connect(
	mapState,
	mapDispatch
)(Room);

export default ReduxConnectedRoom;
