import React, { useState, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import SignedInLinks from '../containers/LogoutContainer'
import SignedOutLinks from './SignedOutLinks'
import { device } from '../pages/Mediaqueries';
import styled, { ThemeProvider } from 'styled-components';


class Navbar extends Component {
	constructor(props) {
		super(props)

	}

	render() {
		const { user } = this.props;

		return (

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


	}
}

const mapStateToProps = state => ({
	...state
});

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