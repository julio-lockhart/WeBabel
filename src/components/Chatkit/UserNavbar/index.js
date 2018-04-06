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

// Component
import SignOutButton from '../../Registrations/SignOut';

const UserNavbar = ({ user }) => {
   return (
      <Navbar color="light" light expand="md">
         <NavbarBrand>WeBabel</NavbarBrand>
         <NavbarToggler />
         <Collapse navbar>
            <Nav className="ml-auto" navbar>
               <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                     <div>
                        <img className="rounded-circle" src={user.avatarURL} alt={"Photo of " + user.name} style={{ width: '40px', height: '40px' }} />
                        <div>{user.name}</div>
                     </div>
                  </DropdownToggle>

                  <DropdownMenu right>
                     <DropdownItem>
                        Option 1
                     </DropdownItem>

                     <DropdownItem>
                        Option 2
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
   );
};

export default UserNavbar;