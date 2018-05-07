import React, { Component } from 'react';
import { Button, ButtonGroup, ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu, Modal } from 'reactstrap';
//import Modal from 'react-responsive-modal';
import styled from 'styled-components';

// Components
import SearchUserForm from '../SearchUserForm/';

const Container = styled.div`
   border-bottom   : 1px solid #e0e0e0;
   z-index         : 1;
   display         : flex;
   flex-direction  : row;
   align-items     : center;
   padding         : 1rem;
   height          : 4.8rem;
   background-color: white;
`;

const Title = styled.div`
   margin: auto;
`;

const TypingIndicatorText = styled.div`
   font-size : 0.7rem;
   color     : rgba(0, 0, 0, 0.38);
`;

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
      console.log('onAddUserToRoom', userList);

      const { actions } = this.props;

      userList.map(user => {
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