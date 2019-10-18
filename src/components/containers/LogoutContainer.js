import { connect } from 'react-redux';
import SignedInLinks from '../NavBar/SignedInLinks'

//TODO Import this file directly to the NavBar Component , so that redux and the react component are communicating 
const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({ type: 'LOGOUT' })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignedInLinks);
