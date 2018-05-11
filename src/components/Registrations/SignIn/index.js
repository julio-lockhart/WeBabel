import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Resources
import 'font-awesome/css/font-awesome.min.css';
import { Alert } from 'reactstrap';
import '../registrationStyle.css';
import logo from '../img/logo.jpg';

import { PasswordForgetLink } from '../PasswordForget'
import { auth, firebase, db } from '../../../firebase';
import * as routes from '../../../constants/routes';

// Chatkit
import { createUserOnChatkit } from '../../../chatkit';

const updateByPropertyName = (propertyName, value) => () => ({
   [propertyName]: value,
});

// Initial login data
const INITIAL_STATE = {
   email: '',
   password: '',
   error: null,
};

class SignInPage extends Component {
   constructor(props) {
      super(props);

      // State
      this.state = { ...INITIAL_STATE };

      // Event binding
      this.logInWithGoogle = this.logInWithGoogle.bind(this);
      this.logInWithFacebook = this.logInWithFacebook.bind(this);
   }

   onSubmit = (event) => {
      const {
         email, password
      } = this.state;

      const {
         history
      } = this.props;

      auth.doSignInWithEmailAndPassword(email, password)
         .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
         })
         .catch(error => {
            this.setState(updateByPropertyName('error', error));
         });

      event.preventDefault();
   }

   logInWithGoogle = (event) => {
      event.preventDefault();

      let provider = firebase.googleProvider;
      provider.addScope('https://www.googleapis.com/auth/user.emails.read');
      provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

      this.logInWithPopup(provider);
   };

   logInWithFacebook = (event) => {
      event.preventDefault();

      let provider = firebase.facebookProvider;
      provider.addScope('email');
      provider.addScope('public_profile');

      this.logInWithPopup(provider);
   };

   logInWithPopup = async (provider) => {
      auth.doSignInWithPopup(provider)
         .then(async (result) => {
            const isNewUser = result.additionalUserInfo.isNewUser;
            const user = result.user;

            if (isNewUser) {
               await db.doCreateUser(user.uid, user.displayName, user.email, user.photoURL);
               const createResult = await createUserOnChatkit(user.uid, user.displayName, user.photoURL);
               console.log("createResult status", createResult.status);
               console.log("createResult", createResult.data);
            }

            this.props.history.push(routes.HOME);
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode, errorMessage);
         });
   }

   render() {
      const {
         email,
         password,
         error,
      } = this.state;

      const isInvalid =
         password === '' ||
         email === '';

      return (
         <div className="my-login-page">
            <section className="h-100">
               <div className="container h-100">
                  <div className="row justify-content-md-center h-100">
                     <div className="card-wrapper">

                        <div className="brand">
                           <img src={logo} alt="WeBabel Logo" />
                        </div>

                        <div className="card fat">
                           <div className="card-body">
                              <h4 className="card-title">Welcome to
                                            <span> WeBabel</span>
                              </h4>
                              <form onSubmit={this.onSubmit}>
                                 <div className="form-group">
                                    <label htmlFor="email">E-Mail Address</label>
                                    <input
                                       id="email"
                                       type="email"
                                       className="form-control"
                                       name="email"
                                       value={email}
                                       onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                                       required autoFocus />
                                 </div>

                                 <div className="form-group">
                                    <label htmlFor="password">Password
                                                    <div className="float-right">
                                          <PasswordForgetLink />
                                       </div>
                                    </label>
                                    <input
                                       id="password"
                                       type="password"
                                       className="form-control"
                                       name="password"
                                       value={password}
                                       onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
                                       required data-eye />
                                 </div>

                                 <div className="form-group">
                                    <label>
                                       <input type="checkbox" name="remember" /> Remember Me
                                                </label>
                                 </div>

                                 <div className="form-group no-margin">
                                    <button
                                       type="submit"
                                       className="btn btn-primary btn-block"
                                       disabled={isInvalid}>
                                       Login
                                                </button>
                                 </div>

                                 {error &&
                                    <Alert color="danger"
                                       className="m-3">{error.message}</Alert>
                                 }

                                 <div className="text-center m-3">
                                    <span className="lead">Or Login With</span>
                                 </div>

                                 <div className="btn-group">
                                    <a className="btn btn-danger disabled">
                                       <i className="fa fa-google-plus" />
                                    </a>
                                    <button
                                       type="submit"
                                       className="btn btn-danger btn-block"
                                       onClick={this.logInWithGoogle}>
                                       Sign in with Google
                                                </button>
                                 </div>

                                 <div className="btn-group">
                                    <a className="btn btn-primary disabled">
                                       <i className="fa fa-facebook" />
                                    </a>
                                    <button
                                       type="submit"
                                       className="btn btn-primary btn-block"
                                       onClick={this.logInWithFacebook}>
                                       Sign in with Facebook
                                                </button>
                                 </div>

                                 <div className="margin-top20 text-center ">
                                    Don't have an account?
                                                {' '}
                                    <Link to={routes.SIGN_UP}>Create One</Link>
                                 </div>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </div>

      );
   };
};

export default withRouter(SignInPage);