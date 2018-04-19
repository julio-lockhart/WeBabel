import React from "react";
import {
   ButtonGroup,
   ButtonDropdown,
   DropdownItem,
   DropdownToggle,
   DropdownMenu
} from "reactstrap";
import styled from "styled-components";

// Component
import SignOutButton from "../../Registrations/SignOut";
import ModalExample from "../CreateRoomForm";

// Styled Components
const SidebarHeader = styled.header`
  border-bottom   : 1px solid #e0e0e0;
  z-index         : 1;
  flex            : none;
  display         : flex;
  align-items     : center;
  padding         : 1rem;
  height          : 4.8rem;
`;

const UserName = styled.div`
  font-size  : 1.2rem;
  margin-left: 8px;
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
         dropdownOpen: false,
         showModal: false
      };

      this.toggle = this.toggle.bind(this);
      this.toggleModal = this.toggleModal.bind(this);
   }

   // Toggling the dropdown
   toggle() {
      this.setState({
         dropdownOpen: !this.state.dropdownOpen
      });
   }

   toggleModal() {
      this.setState({
         showModal: !this.state.showModal
      });
   }

   render() {
      const { user } = this.state;

      return (
         <div>
            <SidebarHeader>
               <UserImage
                  className="rounded-circle"
                  src={
                     user.avatarURL
                        ? user.avatarURL
                        : "https://image.flaticon.com/icons/svg/149/149071.svg"
                  }
                  alt={"Photo of " + user.name} />

               <UserName>{user.name}</UserName>

               <UserOptions>
                  <ButtonGroup>
                     <ButtonDropdown
                        isOpen={this.state.dropdownOpen}
                        toggle={this.toggle}
                     >
                        <DropdownToggle caret size="sm" />
                        <DropdownMenu>
                           <DropdownItem onClick={this.toggleModal}>Create a Room</DropdownItem>
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

            {
               this.state.showModal ? <ModalExample isOpen={this.state.showModal} /> : null
            }
         </div>
      );
   }
}

export default UserNavbar;
