import Timer from '../Room/Timer';
import { connect } from 'react-redux';

let matchStateToProps = (state) => {
  return state;
};

let matchDispatchToProps = (dispatch) => {
  return {

    onTimeOut: () => dispatch({ type: 'DISABLE_BUTTON' })
  }
}

export default connect(matchStateToProps, matchDispatchToProps)(Timer);