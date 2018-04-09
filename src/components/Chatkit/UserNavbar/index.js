import React from 'react';
import {
   Collapse,
   Navbar,
   NavbarToggler,
   NavbarBrand,
   Nav,
   NavItem,
   NavLink,
   Button
} from 'reactstrap';

// Component
import SignOutButton from '../../Registrations/SignOut';

// Resources
import './index.module.css';

class UserNavbar extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         user: this.props.user,
         collapsed: true,
         modal: false
      };

      // Binding
      this.toggleNavbar = this.toggleNavbar.bind(this);
   }

   // componentWillReceiveProps(newState) {
   //    if (newState.user) {
   //       if (this.state.user !== newState.user) {
   //          this.setState({
   //             user: newState.user
   //          });
   //       }
   //    }
   // }

   // --------------------------------------
   // toggleNavBar - launches options
   // --------------------------------------
   toggleNavbar() {
      this.setState({
         collapsed: !this.state.collapsed
      });
   }

   render() {
      const { user } = this.state;

      return (
         <div className="user-navbar">
            <Navbar light>
               <NavbarBrand className="mr-auto">
                  <div className="display">
                     <img
                        className="rounded-circle avatar"
                        src={user.avatarURL ? user.avatarURL : "https://image.flaticon.com/icons/svg/149/149071.svg"}
                        alt={"Photo of " + user.name} />

                     <span className="username h5">{user.name}</span>
                  </div>
               </NavbarBrand>

               <NavbarBrand>
                  <Button
                     color="link"
                     className="create-room_button" />
               </NavbarBrand>

               <NavbarToggler
                  onClick={this.toggleNavbar}
                  className="mr-2" />

               <Collapse
                  isOpen={!this.state.collapsed}
                  navbar>

                  <Nav navbar>
                     <NavItem>
                        <NavLink>
                           <Button
                              color="primary"
                              size="lg">Account</Button>
                        </NavLink>
                     </NavItem>

                     <NavItem>
                        <NavLink>
                           <SignOutButton />
                        </NavLink>
                     </NavItem>
                  </Nav>

               </Collapse>
            </Navbar>
         </div>
      );
   };
};

export default UserNavbar;