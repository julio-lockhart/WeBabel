import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import './createRoomForm.css';

export const CreateRoomForm = ({ submit }) => (
   <Form className="form">
      <FormGroup>
         <Input type="text" name="" id="" placeholder="with a placeholder" />
      </FormGroup>
   </Form>
);

export default CreateRoomForm;