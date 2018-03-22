import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';
import * as routes from '../../constants/routes';

const App = ({ authUser }) =>
  <Router>
    <div>
      {authUser
        ? <h1>Auth</h1>
        : <SignInPage />
      }
    </div>
  </Router>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(App);
