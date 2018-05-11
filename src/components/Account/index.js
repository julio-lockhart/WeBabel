import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import {
   TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col,
   Form, FormGroup, Label, Input,
   Collapse,
   Navbar,
   NavbarToggler,
   NavbarBrand,
   Alert
} from 'reactstrap';
import classnames from 'classnames';

// Components
import PasswordChangeForm from '../Registrations/PasswordChange';
import withAuthorization from '../Session/withAuthorization';

// Styled Component
import { AccountContainer } from "./style.js";

// Firebase Auth
import { auth } from "../../firebase";
import { apiInstance } from '../../constants/apiInstance';

class AccountPage extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         activeTab: '1',
         doShowDeleteWarning: false
      };

      this.toggle = this.toggle.bind(this);
      this.onLogOut = this.onLogOut.bind(this);
      this.onDeleteAccountShowWarning = this.onDeleteAccountShowWarning.bind(this);
      this.onDoDeleteAccount = this.onDoDeleteAccount.bind(this);
   }

   toggle(tab) {
      if (this.state.activeTab !== tab) {
         this.setState({
            activeTab: tab
         });
      }
   }

   onLogOut() {
      auth.doSignOut();
   }

   onDeleteAccountShowWarning() {
      this.setState({ doShowDeleteWarning: true });
   }

   onDoDeleteAccount = async () => {
      try {
         auth.doDeleteAccount().then(async () => {
            await apiInstance({
               method: "DELETE",
               url: `chatkit/deleteUser/${this.props.authUser.uid}`
            });
         })
      } catch (e) {
         console.log(e);
      }
   }

   render() {

      const { doShowDeleteWarning } = this.state;

      return (
         <div>
            <Navbar color="light" light expand="md">
               <NavbarBrand href="/">WeBabel</NavbarBrand>
               <NavbarToggler onClick={this.toggle} />

               <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                     <NavItem>
                        <NavLink href="/">Chat Home</NavLink>
                     </NavItem>

                     <NavItem>
                        <NavLink
                           href="/"
                           onClick={this.onLogOut}>Log Out</NavLink>
                     </NavItem>
                  </Nav>
               </Collapse>
            </Navbar>

            <div className="container">
               <AccountContainer>
                  <div>
                     <div className="text-center">
                        <img
                           src={this.props.authUser.photoURL}
                           className="rounded-circle"
                           alt={"Photo of " + this.props.authUser.displayName} />
                     </div>

                     <div className="m-4">
                        <Nav tabs>
                           <NavItem>
                              <NavLink
                                 className={classnames({ active: this.state.activeTab === '1' })}
                                 onClick={() => { this.toggle('1'); }}>
                                 Profile
                           </NavLink>
                           </NavItem>

                           <NavItem>
                              <NavLink
                                 className={classnames({ active: this.state.activeTab === '2' })}
                                 onClick={() => { this.toggle('2'); }}>
                                 Reset Password
                           </NavLink>
                           </NavItem>

                           <NavItem>
                              <NavLink
                                 className={classnames({ active: this.state.activeTab === '3' })}
                                 onClick={() => { this.toggle('3'); }}>
                                 Delete Account
                           </NavLink>
                           </NavItem>
                        </Nav>

                        <TabContent activeTab={this.state.activeTab}>
                           <TabPane tabId="1">
                              <Row>
                                 <Col sm="6" className="mx-auto my-3">
                                    <h4 className="text-center">Welcome {this.props.authUser.displayName}</h4>

                                    <Form>
                                       <FormGroup>
                                          <Label for="displayName">Display Name</Label>
                                          <Input type="text" name="displayName" id="displayName" value={this.props.authUser.displayName} disabled />
                                       </FormGroup>

                                       <FormGroup>
                                          <Label for="exampleEmail">Email</Label>
                                          <Input type="email" name="email" id="exampleEmail" value={this.props.authUser.email} disabled />
                                       </FormGroup>
                                    </Form>
                                 </Col>
                              </Row>
                           </TabPane>

                           <TabPane tabId="2">
                              <Row>
                                 <Col sm="12">
                                    <PasswordChangeForm />
                                 </Col>
                              </Row>
                           </TabPane>

                           <TabPane tabId="3">
                              <Row>
                                 <Col sm="12">
                                    <div className="text-center my-5">
                                       <Button
                                          outline
                                          color="danger"
                                          onClick={this.onDeleteAccountShowWarning}>
                                          Delete Account?
                                       </Button>

                                       {doShowDeleteWarning &&
                                          <Alert color="light" className="my-3 mx-5">
                                             Are you sure you want to delete your account?
                                             This cannot be undone.

                                             <div className="my-3">
                                                <Button
                                                   outline
                                                   color="danger"
                                                   onClick={this.onDoDeleteAccount}
                                                   size="lg" block>Delete</Button>
                                             </div>
                                          </Alert>
                                       }
                                    </div>
                                 </Col>
                              </Row>
                           </TabPane>
                        </TabContent>
                     </div>
                  </div>
               </AccountContainer>
            </div>
         </div>
      );
   };
}

const mapStateToProps = (state) => ({
   authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
   withAuthorization(authCondition),
   connect(mapStateToProps)
)(AccountPage);