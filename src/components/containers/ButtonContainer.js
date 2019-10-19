import Button from '../Room/Button';
import { connect } from 'react-redux';

let matchStateToProps = (state) => {
  return state;
};

let matchDispatchToProps = (dispatch) => {
  return {
    handleClick: () => dispatch({ type: 'DISABLE_BUTTON' })
  }
}

export default connect(matchStateToProps, matchDispatchToProps)(Button);