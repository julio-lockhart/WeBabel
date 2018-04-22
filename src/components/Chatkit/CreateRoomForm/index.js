import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText, Label, Input, Table } from 'reactstrap';

// API
import { db } from "../../../firebase/";


///////////////////////////////////////////////
///
/// This component is used to populate a table
/// of the users who will be added to the table.
///
///////////////////////////////////////////////

class FoundUserResult extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         searchedUser: this.props.searchedUser,
         userList: []
      }

      this.addUserToList = this.addUserToList.bind(this);
   }

   // Used to update the searchedUser object
   componentWillReceiveProps(prevProps) {
      if (this.state.searchedUser.id !== prevProps.searchedUser.id) {
         this.setState({
            searchedUser: prevProps.searchedUser
         });
      }
   }

   // Add user to userList
   addUserToList() {
      const { searchedUser } = this.state;

      this.setState(prevState => ({
         userList: [...prevState.userList, searchedUser]
      }));

      this.props.updateUserList(searchedUser);
   };

   render() {
      const { searchedUser, userList } = this.state;

      let tableRow = [];
      userList.forEach((user, idx) => {
         let index = idx + 1;

         tableRow.push(
            <tr key={idx}>
               <th scope="row">{index}</th>
               <td>{user.username}</td>
               <td>{user.email}</td>
            </tr>
         );
      });

      return (
         <div className="my-3">
            <div>
               <p className="h3">Found User:</p>
               <p className="h5">{searchedUser.email} - {searchedUser.username}</p>
               <Button
                  color="info"
                  onClick={this.addUserToList}>Add User</Button>
            </div>

            {
               userList.length > 0 ?
                  (
                     <div className="my-5">
                        <p className="h4">User List:</p>
                        <Table responsive>
                           <thead>
                              <tr>
                                 <th>#</th>
                                 <th>User Name</th>
                                 <th>Email</th>
                              </tr>
                           </thead>
                           <tbody>
                              {
                                 tableRow
                              }
                           </tbody>
                        </Table>
                     </div>
                  ) : null
            }
         </div>
      );
   }
};

///////////////////////////////////////////////
///
/// This component is used to create a room.
///
///////////////////////////////////////////////

class CreateRoomForm extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         modal: true,
         roomName: "",
         email: "",
         searchedUser: null,
         userList: [],
         errorMsg: ""
      };

      this.toggleModal = this.toggleModal.bind(this);
      this.updateUserList = this.updateUserList.bind(this);
   }

   toggleModal() {
      this.setState({
         modal: !this.state.modal
      });
   };

   createRoom = async (e) => {
      e.preventDefault();

      const { createRoom } = this.props;
      const { roomName, userList } = this.state;

      let userIds = [];
      for (let i = 0; i < userList.length; i++) {
         userIds.push(userList[i].id);
      }

      createRoom({
         name: roomName,
         private: true,
         addUserIds: userIds
      });

      // Close Modal
      this.setState({
         modal: !this.state.modal
      });
   };

   onEmailChange = event => {
      this.setState({
         email: event.target.value
      });
   };

   onRoomNameChange = event => {
      this.setState({
         roomName: event.target.value
      });
   };

   updateUserList(param) {
      this.setState(prevState => ({
         userList: [...prevState.userList, param]
      }));
   }

   onSubmit = async (e) => {
      e.preventDefault();

      const { email } = this.state;

      await db.getUserByEmail(email)
         .then(result => {
            this.setState({
               email: ""
            });

            Object.keys(result).map(k => {
               this.setState({
                  searchedUser: {
                     id: k,
                     email: result[k].email,
                     username: result[k].username
                  }
               });
            });
         })
         .catch(err => console.log(err));
   };

   render() {
      const { searchedUser, userList, roomName } = this.state;
      const isValid = roomName && userList.length > 0;

      return (
         <div>
            <Modal
               isOpen={this.state.modal}
               toggle={this.toggleModal}>

               <ModalHeader toggle={this.toggleModal}>Create a room</ModalHeader>
               <ModalBody>
                  <Form onSubmit={this.onSubmit}>
                     <FormGroup>
                        <Label for="roomNameInput">Room Name</Label>
                        <Input
                           type="text"
                           name="roomName"
                           id="roomNameInput"
                           placeholder="Enter a name for a room"
                           value={this.state.roomName}
                           onChange={this.onRoomNameChange} />

                        <div className="my-3">
                           <Label for="emailInput">Search User by Email</Label>
                           <Input
                              type="email"
                              name="email"
                              id="emailInput"
                              placeholder="Enter an Email Address"
                              value={this.state.email}
                              onChange={this.onEmailChange} />
                        </div>
                     </FormGroup>
                     <Button color="primary">Search</Button>

                     <FormText>
                        {
                           searchedUser ? <FoundUserResult searchedUser={searchedUser} updateUserList={this.updateUserList} /> : null
                        }
                     </FormText>
                  </Form>
               </ModalBody>
               <ModalFooter>
                  <Button
                     color="success"
                     onClick={this.createRoom}
                     disabled={!isValid}>Create Room</Button>{' '}

                  <Button
                     color="secondary"
                     onClick={this.toggleModal}>Cancel</Button>
               </ModalFooter>
            </Modal>
         </div>
      );
   }
}

export default CreateRoomForm;