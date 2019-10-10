import { connect } from 'react-redux';
import Landing from '../pages/Landing';

const mapToState = state => ({
	...state
});

export default connect(
	mapToState,
	null
)(Landing);
