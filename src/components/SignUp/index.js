import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import '../SignIn/SignIn.css';
import logo from '../SignIn/img/logo.jpg';

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

    render() {
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
                                        <form method="POST">
                                            <div className="form-group">
                                                <label htmlFor="name">Display Name</label>
                                                <input id="name" type="text" className="form-control" name="name" required autofocus />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="email">E-Mail Address</label>
                                                <input id="email" type="email" className="form-control" name="email" required />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="passwordOne">Password</label>
                                                <input id="passwordOne" type="password" className="form-control" name="passwordOne" minLength={6} required data-eye />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="passwordTwo">Confirm Password</label>
                                                <input id="passwordTwo" type="password" className="form-control" name="passwordTwo" minLength={6} required data-eye />
                                            </div>

                                            <div className="form-group no-margin">
                                                <button type="submit" className="btn btn-primary btn-block">
                                                    Register
                                                </button>
                                            </div>

                                            <div className="margin-top20 text-center">
                                                Already have an account?
                                                <a href="index.html">Login</a>
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