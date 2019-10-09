import SignUp from '../pages/signuppage';
import { connect } from 'react-redux';


const matchStatetoProps = (state) => {
    return {

        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        password: state.password

    }
};

const matchDispatchtoProps = (dispatch) => {
    return {
        addFirstName: () => dispatch({ type: 'ADD_FIRST_NAME' }),
        addLastName: () => dispatch({ type: 'ADD_LAST_NAME' }),
        addEmail: () => dispatch({ type: 'ADD_EMAIL' }),
        addPassword: () => dispatch({ type: 'ADD_PASSWORD' })
    }
}

export default connect(matchDispatchtoProps, matchStatetoProps)(SignUp);