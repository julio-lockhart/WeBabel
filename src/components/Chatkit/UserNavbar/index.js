import React from "react";
import { Link } from 'react-router-dom';
import {
   ButtonGroup,
   ButtonDropdown,
   DropdownItem,
   DropdownToggle,
   DropdownMenu
} from "reactstrap";
import { ACCOUNT } from "../../../constants/routes";

// Component
import SignOutButton from "../../Registrations/SignOut";
import CreateRoomForm from "../CreateRoomForm";

// Styles
import { SidebarHeader, UserName, UserImage, UserOptions } from "./style.js";

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
                  src={user.avatarURL}
                  alt={"Photo of " + user.name} />

               <UserName>{user.name}</UserName>

               <UserOptions>
                  <ButtonGroup>
                     <ButtonDropdown
                        isOpen={this.state.dropdownOpen}
                        toggle={this.toggle}>
                        <DropdownToggle caret size="sm" />
                        <DropdownMenu>
                           <DropdownItem onClick={this.toggleModal}>Create a Room</DropdownItem>
                           <DropdownItem>
                              <Link to={ACCOUNT}>Account</Link>
                           </DropdownItem>
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
               this.state.showModal ?
                  <CreateRoomForm
                     isOpen={this.state.showModal}
                     user={user}
                     createRoom={this.props.createRoom} /> : null
            }
         </div>
      );
   }
}

export default UserNavbar;
