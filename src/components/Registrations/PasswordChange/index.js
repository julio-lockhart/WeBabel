import React, { Component } from 'react';

// Resources
import 'font-awesome/css/font-awesome.min.css';
import { Alert } from 'reactstrap';
import '../registrationStyle.css';
import logo from '../img/logo.jpg';

import { auth } from '../../../firebase';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
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
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

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
                    <h4 className="card-title">Reset Password</h4>
                    <form method="POST">
                      <div className="form-group">
                        <label htmlFor="new-password">New Password</label>
                        <input id="new-password" type="password" className="form-control" name="password" required autoFocus data-eye />
                        <div className="form-text text-muted">
                          Make sure your password is strong and easy to remember
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

export default PasswordChangeForm;