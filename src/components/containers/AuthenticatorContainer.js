import Authenticator from '../pages/Authenticator';
import { connect } from 'react-redux';

const matchStatetoProps = state => {
	return {
		...state
	};
};

const matchDispatchtoProps = dispatch => {
	return {
		authenticateUser: payload => {
			dispatch({
				type: 'LOGIN',
				payload: {
					...payload,
					isLoggedIn: true
				}
			});
		}
	};
};

export default connect(
	matchStatetoProps,
	matchDispatchtoProps
)(Authenticator);
