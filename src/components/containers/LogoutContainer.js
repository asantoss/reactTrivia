import { connect } from 'react-redux';
import SignedInLinks from '../NavBar/SignedInLinks'
import Firebase, { doSignOut } from '../firebase/Firebase'
import logout from '../../actions/Login'
const mapDispatchToProps = (dispatch) => {
    return {
        doSignOut: () => dispatch(doSignOut())
    }
}

export default connect(
    null,
    matchDispatchtoProps
)(SignedInLinks);
