import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Alert, Fade } from 'reactstrap';

// Resources
import 'font-awesome/css/font-awesome.min.css';
import '../registrationStyle.css';
import logo from '../img/logo.jpg';

// Firebase
import { auth, db, firebase } from '../../../firebase';
import * as routes from '../../../constants/routes';
import FileUploader from 'react-firebase-file-uploader';

// Chatkit
import { createUserOnChatkit } from '../../../chatkit';

const updateByPropertyName = (propertyName, value) => () => ({
   [propertyName]: value,
});

const INITIAL_STATE = {
   username: '',
   avatar: '',
   email: '',
   passwordOne: '',
   passwordTwo: '',
   isUploading: false,
   progress: 0,
   avatarURL: '',
   error: null
};

class SignUpPage extends Component {
   constructor(props) {
      super(props);

      this.state = { ...INITIAL_STATE };
   }

   handleChangeUsername = (event) => this.setState({ username: event.target.value });

   handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

   handleProgress = (progress) => this.setState({ progress });

   handleUploadError = (error) => {
      this.setState({ isUploading: false });
      console.error(error);
   }

   handleUploadSuccess = (filename) => {
      this.setState({ avatar: filename, progress: 100, isUploading: false });
      firebase.firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({ avatarURL: url }));
   };

   // Create user in Firebase and Chatkit
   onSubmit = async (event) => {
      const {
         username,
         email,
         passwordOne,
         avatarURL
      } = this.state;

      const { history } = this.props;

      auth.doCreateUserWithEmailAndPassword(email, passwordOne)
         .then(async (user) => {
            try {
               // Update User Profile
               const imageURL = avatarURL ? avatarURL : "https://image.flaticon.com/icons/svg/149/149071.svg";
               console.log('image url', imageURL);
               await user.updateProfile({ displayName: username });
               await db.doCreateUser(user.uid, user.displayName, user.email, imageURL);

               // Create User on Chatkit
               await createUserOnChatkit(user.uid, user.displayName, imageURL);

               this.setState(() => ({ ...INITIAL_STATE }));
               history.push(routes.HOME);
            } catch (e) {
               this.setState(updateByPropertyName('error', e));
               console.log(e);
            }
         })
         .catch(createError => {
            this.setState(updateByPropertyName('error', createError));
            console.log('createError', createError);
         });

      event.preventDefault();
   };

   render() {
      const {
         username,
         email,
         passwordOne,
         passwordTwo,
         error,
         isUploading,
         progress,
         avatarURL
      } = this.state;

      const isInvalid =
         passwordOne !== passwordTwo ||
         passwordOne === '' ||
         username === '' ||
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
                              <h4 className="card-title">Register for
                                 <span> WeBabel</span>
                              </h4>
                              <form onSubmit={this.onSubmit}>
                                 <div className="form-group">

                                    {
                                       (!isUploading && progress === 100) &&
                                       <img
                                          src={avatarURL}
                                          alt="Profile Upload"
                                          style={{ height: '80px', width: '80px' }} />
                                    }

                                    <label
                                       className="my-3 text-center"
                                       style={{ backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, pointer: 'cursor' }}>
                                       Upload a picture

                                       <FileUploader
                                          hidden
                                          accept="image/*"
                                          name="avatar"
                                          randomizeFilename
                                          storageRef={firebase.firebase.storage().ref('images')}
                                          onUploadStart={this.handleUploadStart}
                                          onUploadError={this.handleUploadError}
                                          onUploadSuccess={this.handleUploadSuccess}
                                          onProgress={this.handleProgress} />
                                    </label>

                                    {
                                       isUploading &&
                                       <Fade in={this.state.fadeIn} tag="h5" className="m-5">
                                          <Alert color="primary">
                                             Progress: {progress}
                                          </Alert>
                                       </Fade>
                                    }

                                    <label htmlFor="name">Display Name</label>
                                    <input
                                       id="name"
                                       type="text"
                                       className="form-control"
                                       name="name"
                                       value={username}
                                       onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
                                       required autoFocus />
                                 </div>

                                 <div className="form-group">
                                    <label htmlFor="email">E-Mail Address</label>
                                    <input
                                       id="email"
                                       type="email"
                                       className="form-control"
                                       name="email"
                                       value={email}
                                       onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                                       required />
                                 </div>

                                 <div className="form-group">
                                    <label htmlFor="passwordOne">Password</label>
                                    <input
                                       id="passwordOne"
                                       type="password"
                                       className="form-control"
                                       name="passwordOne"
                                       minLength={6}
                                       value={passwordOne}
                                       onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
                                       required data-eye />
                                 </div>

                                 <div className="form-group">
                                    <label htmlFor="passwordTwo">Confirm Password</label>
                                    <input
                                       id="passwordTwo"
                                       type="password"
                                       className="form-control"
                                       name="passwordTwo"
                                       minLength={6}
                                       value={passwordTwo}
                                       onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
                                       required data-eye />
                                 </div>

                                 <div className="form-group no-margin">
                                    <button
                                       type="submit"
                                       className="btn btn-primary btn-block"
                                       disabled={isInvalid}>
                                       Register
                                                </button>
                                 </div>

                                 {error &&
                                    <Alert color="danger"
                                       className="m-3">{error.message}</Alert>
                                 }

                                 <div className="margin-top20 text-center">
                                    Already have an account?
                                                {' '}
                                    <Link to={routes.SIGN_IN}>Sign In</Link>
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
}

export default withRouter(SignUpPage);