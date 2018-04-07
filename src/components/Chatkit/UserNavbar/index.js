import React from 'react';
import {
   Collapse,
   Navbar,
   NavbarToggler,
   NavbarBrand,
   Nav,
   NavItem,
   NavLink,
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem
} from 'reactstrap';

import './userNavbar.css';

// Component
import SignOutButton from '../../Registrations/SignOut';

import './userNavbar.css';

const UserNavbar = ({ user }) => {
   return (
      <div>
         <Navbar color="light" light expand="md">
            <NavbarBrand>WeBabel</NavbarBrand>
            <NavbarToggler />

            <Collapse navbar>
               <Nav className="ml-auto" navbar>
                  <NavItem>
                     <NavLink>
                        <div>
                           <img
                              className="avatar rounded-circle"
                              src={user.avatarURL ? user.avatarURL : "https://image.flaticon.com/icons/svg/149/149071.svg"}
                              alt={"Photo of " + user.name} />
                           {user.name}
                        </div>
                     </NavLink>
                  </NavItem>

                  <UncontrolledDropdown nav inNavbar>
                     <DropdownToggle className="dropdown-toggle" nav caret>

                     </DropdownToggle>
                     <DropdownMenu right>
                        <DropdownItem>
                           <NavLink>Account</NavLink>
                        </DropdownItem>

                        <DropdownItem divider />
                        <DropdownItem>
                           <SignOutButton />
                        </DropdownItem>
                     </DropdownMenu>
                  </UncontrolledDropdown>

               </Nav>
            </Collapse>

         </Navbar>
      </div>
   );
};

export default UserNavbar;