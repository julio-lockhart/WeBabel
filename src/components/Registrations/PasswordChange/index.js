import React, { Component } from 'react';

// Resources
import 'font-awesome/css/font-awesome.min.css';
import '../registrationStyle.css';

import { auth } from '../../../firebase';

const updateByPropertyName = (propertyName, value) => () => ({
   [propertyName]: value,
});

const INITIAL_STATE = {
   password: ''
};

class PasswordChangeForm extends Component {
   constructor(props) {
      super(props);

      this.state = { ...INITIAL_STATE };
   }

   onSubmit = (event) => {
      event.preventDefault();
      const { password } = this.state;

      auth.doPasswordUpdate(password)
         .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
         })
         .catch(error => {
            this.setState(updateByPropertyName('error', error));
         });
   }

   render() {
      const {
         password
      } = this.state;

      return (
         <div className="my-login-page_no-height">
            <section>
               <div className="row justify-content-md-center align-items-center">
                  <div className="card-wrapper my-4">
                     <div className="card fat">
                        <div className="card-body">
                           <h4 className="card-title">Reset Password</h4>

                           <form method="POST" onSubmit={this.onSubmit}>
                              <div className="form-group">
                                 <label htmlFor="new-password">New Password</label>
                                 <input
                                    id="new-password"
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
                                    required autoFocus data-eye />

                                 <div className="form-text text-muted">
                                    Make sure your password is strong and easy to remember
                                 </div>
                              </div>

                              <div className="form-group no-margin">
                                 <button
                                    type="submit"
                                    className="btn btn-primary btn-block">
                                    Reset Password
                                 </button>
                              </div>
                           </form>
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