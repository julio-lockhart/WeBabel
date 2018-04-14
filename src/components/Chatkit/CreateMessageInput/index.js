import React, { Component } from 'react';
import {
   InputGroup,
   InputGroupAddon,
   Input,
   Button
} from 'reactstrap';
import styled from 'styled-components';

const Container = styled.div`
   border-top: 1px solid #e0e0e0;
   height    : 3.6rem;

   .input-group {
      height       : 100%;
      display      : flex;
      align-content: stretch;
   }

   .input-group>input {
      flex   : 1 0 auto;
      padding: 0;
   }
`;

class CreateMessageInput extends Component {
   render() {
      return (
         <Container>
            <InputGroup>
               <Input placeholder="Send a Message..." />
               <InputGroupAddon addonType="prepend">
                  <Button color="primary">Submit</Button>
               </InputGroupAddon>
            </InputGroup>
         </Container>
      );
   }
}

export default CreateMessageInput;