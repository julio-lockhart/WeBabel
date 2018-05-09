import React, { Component } from 'react';
import {
   Button, ButtonGroup, ButtonDropdown, DropdownItem,
   DropdownToggle, DropdownMenu, Modal
} from 'reactstrap';

// Components
import SearchUserForm from '../SearchUserForm/';

// Styles
import { Container, Title, TypingIndicatorText } from './style.js';

class RoomHeader extends Component {
   constructor(props) {
      super(props);

      this.state = {
         isModalOpen: false,
         dropdownOpen: false
      }

      this.toggle = this.toggle.bind(this);
      this.onAddUserToRoom = this.onAddUserToRoom.bind(this);
      this.onDeleteRoomBtnClick = this.onDeleteRoomBtnClick.bind(this);
      this.onLeaveRoomBtnClick = this.onLeaveRoomBtnClick.bind(this);
   }

   // Toggling the dropdown
   toggle() {
      this.setState({
         dropdownOpen: !this.state.dropdownOpen
      });
   }

   onOpenModal = () => {
      this.setState({ isModalOpen: true });
   };

   onCloseModal = () => {
      this.setState({ isModalOpen: false });
   };

   onAddUserToRoom = (userList) => {
      const { actions } = this.props;

      userList.forEach(user => {
         actions.runCommand("invite " + user.id);
      })

      this.onCloseModal();
   }

   onDeleteRoomBtnClick() {
      const { user, room } = this.props;

      try {
         user.deleteRoom({ roomId: room.id })
            .then(() => {
               console.log(`Deleted room with ID: ${room.id}`);
            })
            .catch(err => {
               console.log(`Error deleted room ${room.id}: ${err}`)
            });
      } catch (err) {
         console.log("Error deleting room", err);
      }
   };

   onLeaveRoomBtnClick() {
      const { actions } = this.props;
      actions.runCommand("leave");
   }

   render() {
      const { room, typing } = this.props;
      const { isModalOpen } = this.state;

      let userIsTyping = "";
      if (typing[room.id]) {
         const id = Object.keys(typing[room.id])[0];
         room.users.forEach(user => {
            if (user.id === (id)) {
               userIsTyping = user.name;
            }
         });
      } else {
         userIsTyping = "";
      }

      return (
         <Container>
            <Title>
               <div>{room.name}</div>
               {
                  userIsTyping !== "" ?
                     <TypingIndicatorText className="text-center">{`${userIsTyping} is typing...`}</TypingIndicatorText> :
                     null
               }
            </Title>

            <ButtonGroup >
               <Button>
                  {
                     room.users && room.users.length
                  }
               </Button>
               <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle caret size="sm" />

                  <DropdownMenu>
                     <DropdownItem onClick={this.onOpenModal}>Add a User</DropdownItem>
                     <DropdownItem
                        style={{ color: 'red' }}
                        onClick={this.onLeaveRoomBtnClick}>Leave Chat
                     </DropdownItem>
                  </DropdownMenu>

               </ButtonDropdown>
            </ButtonGroup>

            <Modal isOpen={isModalOpen} toggle={this.onCloseModal}>
               <SearchUserForm
                  actionButtonContent="Add to Room"
                  runAction={this.onAddUserToRoom} />
            </Modal>
         </Container>
      );
   }
}

export default RoomHeader;