import React from "react";
import {
   Button, ModalHeader, ModalBody, ModalFooter, Table,
   Form, FormGroup, Label, Input
} from 'reactstrap';

// API
import { db } from "../../../firebase/";

class SearchUserForm extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         emailInput: "",
         searchedUser: null,
         userList: []
      };

      this.updateUserList = this.updateUserList.bind(this);
      this.runAction = this.runAction.bind(this);
   }

   onEmailChange = event => {
      this.setState({
         emailInput: event.target.value
      });
   };

   updateUserList(param) {
      this.setState(prevState => ({
         userList: [...prevState.userList, param]
      }));
   }

   // On user search form submit
   onSubmit = async (e) => {
      e.preventDefault();

      const { emailInput } = this.state;
      await db.getUserByEmail(emailInput)
         .then(result => {
            this.setState({
               email: ""
            });

            Object.keys(result).forEach(k => {
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

   runAction = () => {
      const { userList } = this.state;
      this.props.runAction(userList);
   };

   render() {
      const { searchedUser, userList } = this.state;

      return (
         <div>
            <ModalHeader>Add User</ModalHeader>

            <ModalBody>
               <Form onSubmit={this.onSubmit}>
                  <FormGroup>
                     <Label>Search User by Email</Label>
                     <Input
                        type="email"
                        name="email"
                        id="emailInput"
                        placeholder="Enter an Email Address"
                        value={this.state.emailInput}
                        onChange={this.onEmailChange} />
                  </FormGroup>
                  <Button color="primary">Search</Button>
               </Form>

               {
                  searchedUser ? <FoundResult searchedUser={searchedUser} updateUserList={this.updateUserList} /> : null
               }
            </ModalBody>

            <ModalFooter>
               <Button
                  disabled={!userList.length > 0}
                  color="primary"
                  onClick={this.runAction}>{this.props.actionButtonContent}</Button>{' '}
            </ModalFooter>
         </div>
      );
   }
}

// Table display of users found when searching
class FoundResult extends React.Component {
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

export default SearchUserForm;