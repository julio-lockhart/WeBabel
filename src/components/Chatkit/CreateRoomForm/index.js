import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText, Label, Input } from 'reactstrap';

// API
import { db } from "../../../firebase/";

const FoundUserResult = ({ searchedUser }) => {
   return (
      <div>
         <h3>Found User:</h3>

         <p>{searchedUser.email} - {searchedUser.name}</p>
      </div>
   );
};

class ModalExample extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         modal: true,
         email: "",
         searchedUser: {},
         errorMsg: ""
      };

      this.toggle = this.toggle.bind(this);
   }

   toggle() {
      this.setState({
         modal: !this.state.modal
      });
   };

   onEmailChange = event => {
      this.setState({
         email: event.target.value
      });
   };

   onSubmit = async (e) => {
      e.preventDefault();

      const { email } = this.state;

      await db.getUserByEmail(email)
         .then(result => {
            console.log('cb', result);

            Object.keys(result).map(k => {
               this.setState({
                  searchedUser: {
                     id: k,
                     email: result[k].email,
                     username: result[k].username
                  }
               });
            })


         })
         .catch(err => console.log(err));
   };

   render() {
      const { searchedUser } = this.state;

      return (
         <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
               <ModalHeader toggle={this.toggle}>Create a room</ModalHeader>
               <ModalBody>
                  <Form onSubmit={this.onSubmit}>
                     <FormGroup>
                        <Label for="exampleEmail">Search User by Email</Label>
                        <Input
                           type="email"
                           name="email"
                           id="exampleEmail"
                           placeholder="Enter an Email Address"
                           value={this.state.email}
                           onChange={this.onEmailChange} />
                     </FormGroup>
                     <Button color="primary">Search</Button>

                     <FormText>
                        {
                           searchedUser ? <FoundUserResult searchedUser={searchedUser} /> : null
                        }
                     </FormText>
                  </Form>
               </ModalBody>
               <ModalFooter>
                  <Button color="primary" onClick={this.toggle}>Create Room</Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
               </ModalFooter>
            </Modal>
         </div>
      );
   }
}

export default ModalExample;