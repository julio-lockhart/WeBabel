import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Resources
import 'font-awesome/css/font-awesome.min.css';
import './SignIn.css';
import logo from './img/logo.jpg';

// import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

// Initial login data
const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};


class SignInPage extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    render() {
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
                                        <form method="POST">
                                            <div className="form-group">
                                                <label htmlFor="email">E-Mail Address</label>
                                                <input id="email" type="email" className="form-control" name="email" required autoFocus />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="password">Password
                                                    <a href="forgot.html" className="float-right">
                                                        Forgot Password?
                                                    </a>
                                                </label>
                                                <input id="password" type="password" className="form-control" name="password" required data-eye />
                                            </div>

                                            <div className="form-group">
                                                <label>
                                                    <input type="checkbox" name="remember" /> Remember Me
                                                </label>
                                            </div>

                                            <div className="form-group no-margin">
                                                <button type="submit" className="btn btn-primary btn-block">
                                                    Login
                                                </button>
                                            </div>

                                            <div className="text-center m-3">
                                                <span className="lead">Or Login With</span>
                                            </div>

                                            <div className="btn-group">
                                                <a className="btn btn-danger disabled">
                                                    <i className="fa fa-google-plus" />
                                                </a>
                                                <button type="submit" className="btn btn-danger btn-block">
                                                    Sign in with Google
                                                </button>
                                            </div>

                                            <div className="btn-group">
                                                <a className="btn btn-primary disabled">
                                                    <i className="fa fa-facebook" />
                                                </a>
                                                <button type="submit" className="btn btn-primary btn-block">
                                                    Sign in with Facebook
                                                </button>
                                            </div>

                                            <div className="margin-top20 text-center ">
                                                Don't have an account?
                                                {' '}
                                                <Link to='../SignUp'>Create One</Link>
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