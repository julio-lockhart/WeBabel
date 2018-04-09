import React from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

import './createMessage.css';

const CreateMessage = ({
   state: { user = {}, room = {}, message = '' },
   actions: { runCommand }
}) => {

   this.sendMessage = (e) => {
      e.preventDefault();

      const message = e.target[0].value;
      e.target[0].value = '';

      message.length > 0 &&
         user.sendMessage({
            text: message,
            roomId: room.id,
         });
   };

   return (
      <Form
         inline
         className="createMessageForm"
         onSubmit={this.sendMessage}>
         <FormGroup role="form">
            <Label for="messageText" hidden>Message</Label>
            <Input type="text" name="messageText" placeholder="Enter a message..." />
         </FormGroup>

         <Button type="submit">Submit</Button>
      </Form>
   );
};

export default CreateMessage;