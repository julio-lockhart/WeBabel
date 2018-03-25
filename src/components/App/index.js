import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import SignUpPage from '../Registrations/SignUp';
import SignInPage from '../Registrations/SignIn';
import PasswordForgetPage from '../Registrations/PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import withAuthentication from '../Session/withAuthentication';
import * as routes from '../../constants/routes';

import './index.css';

const App = () =>
  <Router>
    <div className="app">
      <Route exact path={routes.AUTH_NAVIGATION} component={() => <Navigation />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
    </div>
  </Router>

export default withAuthentication(App);