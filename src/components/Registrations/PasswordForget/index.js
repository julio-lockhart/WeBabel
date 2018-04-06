import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Resources
import 'font-awesome/css/font-awesome.min.css';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../registrationStyle.css';
import logo from '../img/logo.jpg';

//import { auth } from '../../../firebase';
// API Access
import { apiInstance } from '../../../constants/apiInstance';
import * as routes from '../../../constants/routes';

const PasswordForgetPage = () =>
    <PasswordForgetForm />

const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    error: null,
    message: null
};

class PasswordForgetForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = async (event) => {
        const { email } = this.state;

        // auth.doPasswordReset(email)
        //     .then(() => {
        //         this.setState(() => ({ ...INITIAL_STATE }));
        //         this.setState(updateByPropertyName('message', "A link was sent to your email, please follow the instructions in the email to reset your password."));
        //     })
        //     .catch(error => {
        //         this.setState(updateByPropertyName('error', error));
        //     });

        try {
            const res = await apiInstance({
                method: "POST",
                url: "/firebase/resetPassword",
                data: {
                    email
                }
            });

            return res;
        } catch (e) {
            console.log(e);
        }

        event.preventDefault();
    }

    render() {
        const {
            email,
            error,
            message
        } = this.state;

        const isInvalid = email === '';

        return (
            <div className="my-login-page">
                <section className="h-100">
                    <div className="container h-100">
                        <div className="row justify-content-md-center align-items-center h-100">
                            <div className="card-wrapper">

                                <div className="brand">
                                    <img src={logo} alt="WeBabel Logo" />
                                </div>

                                <div className="card fat">
                                    <div className="card-body">
                                        <h4 className="card-title">Forgot Password</h4>
                                        <Form onSubmit={this.onSubmit}>

                                            <FormGroup>
                                                <Label for="email">E-Mail Address</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                                                    required autoFocus />

                                                <div className="form-text text-muted">
                                                    By clicking "Reset Password" we will send a password reset link
                                                </div>
                                            </FormGroup>

                                            <div className="form-group no-margin">
                                                <Button
                                                    type="submit"
                                                    color="primary"
                                                    className="btn-block"
                                                    disabled={isInvalid}>
                                                    Reset Password
                                                </Button>
                                            </div>

                                            {error &&
                                                <Alert color="danger"
                                                    className="m-3">{error.message}</Alert>
                                            }

                                            {message &&
                                                <Alert color="primary"
                                                    className="m-3">{message}</Alert>
                                            }

                                        </Form>
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
