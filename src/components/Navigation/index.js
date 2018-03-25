import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import SignInPage from '../Registrations/SignIn';
import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';

const Navigation = withRouter(({ history, authUser }) => (
  authUser ? <NavigationAuth /> : <SignInPage />
));

const NavigationAuth = () =>
  <ul>
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);