import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import {
  TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col,
  Form, FormGroup, Label, Input
} from 'reactstrap';
import classnames from 'classnames';

import SignOut from '../Registrations/SignOut'
import PasswordChangeForm from '../Registrations/PasswordChange';
import withAuthorization from '../Session/withAuthorization';

import './account.css';

class AccountPage extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div className="container" >
        <div className="account-profile">
          <div className="">

            <div className="text-center">
              <img src={this.props.authUser.photoURL} className="rounded-circle" alt="..." />
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
                    Moar Tabs
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="6" className="mx-auto">
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
                    <Col sm="6">
                      <Card body>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button>Go somewhere</Button>
                      </Card>
                    </Col>

                    <Col sm="6">
                      <Card body>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button>Go somewhere</Button>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>

              <div className="my-4 text-center">
                <SignOut />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // return (
  //   <div>
  //     <h1>Account: {authUser.email}</h1>
  //     <PasswordForgetForm />
  //     <PasswordChangeForm />
  //   </div>
  // );
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);