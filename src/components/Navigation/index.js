import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import SignUpPage from '../Registrations/SignUp';
import SignInPage from '../Registrations/SignIn';

import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';

// const Navigation = withRouter(({ authUser })) =>
// <div>
//   {
//     console.log('Navigation User State:', authUser)
//   }

//   {authUser
//     ? <div>Auth
//         <NavigationAuth />
//     </div>
//     : <div>No Auth
//         <NavigationNonAuth />
//     </div>
//   }
// </div>

const Navigation = withRouter(({ history, authUser }) => (
  <div>
    {
      console.log('Navigation User State:', authUser)
    }

    {authUser
      ? <div>Auth
        <NavigationAuth />
      </div>
      : <div>No Auth
        <SignInPage />

      </div>
    }
  </div>
));

const NavigationAuth = () =>
  <ul>
    <li><Link to={routes.AUTH_NAVIGATION}>Landing</Link></li>
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to={routes.AUTH_NAVIGATION}>Landing</Link></li>
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
  </ul>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);