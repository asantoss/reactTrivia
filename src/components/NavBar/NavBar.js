import React, { useState, Component } from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { Link } from 'react-router-dom'
import SignedInLinks from '../containers/LogoutContainer'
import SignedOutLinks from './SignedOutLinks'
import { device } from '../pages/Mediaqueries';
import styled, { ThemeProvider } from 'styled-components';

=======
import { Link } from 'react-router-dom';
import SignedInLinks from '../containers/LogoutContainer';
import SignedOutLinks from './SignedOutLinks';
>>>>>>> 9f24ab2bf3fc5b6cafadd4a13c34fc9536bf3c48

class Navbar extends Component {
	render() {
		const { user } = this.props;

		return (
<<<<<<< HEAD

			<nav className="nav-wrapper yellow darken-2">
				<div className="container ">
					<Link to='/home' ></Link>
					{user.isLoggedIn ?
						<SignedInLinks />
						: null
					}
					{!user.isLoggedIn ?
						<SignedOutLinks />
						: null
					}
				</div>
			</nav>


		)


=======
			<nav className='nav-wrapper red darken-3'>
				<div className='container '>
					<Link to='/home'></Link>
					{user.isLoggedIn ? <SignedInLinks /> : null}
					{!user.isLoggedIn ? <SignedOutLinks /> : null}
				</div>
			</nav>
		);
>>>>>>> 9f24ab2bf3fc5b6cafadd4a13c34fc9536bf3c48
	}
}

const mapStateToProps = state => ({
	...state
});

<<<<<<< HEAD
export default connect(
	mapStateToProps,
)(Navbar);



//TODO : The styled component goes here 

export const Nav = styled.div`
@media ${device.laptop} {  
    max-width: 800px;
  }

  @media ${device.desktop} {
    max-width: 1400px;
  }
  @media ${device.mobileS} {
    max-width: 320px;
  }
  @media ${device.mobileM} {
    max-width: 375px;
  }
  @media ${device.mobileL} {
    max-width: 425px;
  }
`
=======
export default connect(mapStateToProps)(Navbar);
>>>>>>> 9f24ab2bf3fc5b6cafadd4a13c34fc9536bf3c48
