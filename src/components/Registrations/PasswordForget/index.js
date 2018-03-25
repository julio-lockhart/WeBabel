import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Resources
import 'font-awesome/css/font-awesome.min.css';
import { Alert } from 'reactstrap';
import '../registrationStyle.css';
import logo from '../img/logo.jpg';

import { auth } from '../../../firebase';
import * as routes from '../../../constants/routes';

const PasswordForgetPage = () =>
  <PasswordForgetForm />

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <div className="my-login-page">
        <section className="h-100">
          <div className="container h-100">
            <div className="row justify-content-md-center align-items-center h-100">
              <div className="card-wrapper">

                <div className="brand">
                  <img src="img/logo.jpg" />
                </div>

                <div className="card fat">
                  <div className="card-body">
                    <h4 className="card-title">Forgot Password</h4>
                    <form method="POST">

                      <div className="form-group">
                        <label htmlFor="email">E-Mail Address</label>
                        <input
                          id="email"
                          type="email"
                          className="form-control"
                          name="email" required autoFocus />
                        <div className="form-text text-muted">
                          By clicking "Reset Password" we will send a password reset link
                        </div>
                      </div>

                      <div className="form-group no-margin">
                        <button type="submit" className="btn btn-primary btn-block">
                          Reset Password
                        </button>
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
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink
};
