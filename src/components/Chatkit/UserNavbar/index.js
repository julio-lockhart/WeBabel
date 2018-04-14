import React from 'react';
import { ButtonGroup, ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import styled from 'styled-components';

// Component
import SignOutButton from '../../Registrations/SignOut';

// Styled Components
const SidebarHeader = styled.header`
   border-bottom: 1px solid #e0e0e0;
   z-index      : 1;
   flex         : none;
   display      : flex;
   align-items  : center;
   padding      : 1rem;
   height       : 4.8rem;
`;

const HandleName = styled.h5`
   font-size  : 0.8rem;
   margin     : 0;
   margin-top : 0.2rem;
   font-weight: normal;
   color      : rgba(0, 0, 0, 0.38);
`;

const UserImage = styled.img`
   width        : 2.8rem;
   height       : 2.8rem;
   border-radius: 0.38rem;
   background   : #e0e0e0;
`;

const UserOptions = styled.div`
   margin-left: auto;
`;

class UserNavbar extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         user: this.props.user,
         dropdownOpen: false
      }

      this.toggle = this.toggle.bind(this);
   }

   // Toggling the dropdown
   toggle() {
      this.setState({
         dropdownOpen: !this.state.dropdownOpen
      });
   }

   render() {
      const { user } = this.state;

      return (
         <SidebarHeader>
            <UserImage
               className="rounded-circle"
               src={user.avatarURL ? user.avatarURL : "https://image.flaticon.com/icons/svg/149/149071.svg"}
               alt={"Photo of " + user.name} />

            <div style={{ marginLeft: '1rem' }}>
               <h3>{user.name}</h3>
               <HandleName>@UserName</HandleName>
            </div>

            <UserOptions>
               <ButtonGroup >
                  <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                     <DropdownToggle caret size="sm" />
                     <DropdownMenu>
                        <DropdownItem>Create a Room</DropdownItem>
                        <DropdownItem>Account</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                           <SignOutButton />
                        </DropdownItem>
                     </DropdownMenu>
                  </ButtonDropdown>
               </ButtonGroup>
            </UserOptions>
         </SidebarHeader>
      );
   }
}

export default UserNavbar;