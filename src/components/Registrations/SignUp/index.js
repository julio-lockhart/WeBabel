import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Resources
import 'font-awesome/css/font-awesome.min.css';
import { Alert } from 'reactstrap';
import '../registrationStyle.css';
import logo from '../img/logo.jpg';

// Firebase
import { auth, db } from '../../../firebase';
import * as routes from '../../../constants/routes';

const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpPage extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const {
            username,
            email,
            passwordOne
        } = this.state;

        const { history } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then((user) => {
                user.updateProfile({
                    displayName: username
                }).then(() => {
                    this.setState(() => ({ ...INITIAL_STATE }));

                    db.doCreateUser(user.uid, user.displayName, user.email);

                    history.push(routes.HOME);
                }).catch(error => {
                    this.setState(updateByPropertyName('error', error));
                });

            })
            .catch(error => {
                this.setState(updateByPropertyName('error', error));
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
                                    <img src="img/logo.jpg" />
                                </div>
                                <div className="card fat">
                                    <div className="card-body">
                                        <h4 className="card-title">Register for
                                            <span> WeBabel</span>
                                        </h4>
                                        <form onSubmit={this.onSubmit}>
                                            <div className="form-group">
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