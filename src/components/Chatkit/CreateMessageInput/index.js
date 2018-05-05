import React from "react";
import { Form, InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
import Modal from 'react-responsive-modal';
import styled from "styled-components";

import GiphySelect from 'react-giphy-select';
import 'react-giphy-select/lib/styles.css';

const Container = styled.div`
  border-top: 1px solid #e0e0e0;
  height    : 3.6rem;

  form {
    height: 100%;
  }

  .input-group {
    height       : 100%;
    display      : flex;
    align-content: stretch;
  }

  .input-group > input {
    flex   : 1 0 auto; 
    padding: 8px;
  }
`;

const GifSection = styled.div`
  margin-bottom: 8px;
`

class CreateMessageInput extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         open: false,
         gifLink: null,
         message: ""
      };

      this.onSubmit = this.onSubmit.bind(this);
   }

   onOpenModal = () => {
      this.setState({ open: true });
   };

   onCloseModal = () => {
      this.setState({ open: false });
   };

   onGifEntrySelection = (gifLink) => {
      this.setState({ gifLink: gifLink.url });
   }

   onGifSelect = () => {
      const { gifLink } = this.state;

      if (gifLink) {
         this.setState({ message: gifLink });
      }

      this.onCloseModal();
   }

   onMessageChange = event => {
      this.setState({
         message: event.target.value
      });
   };

   onSubmit = e => {
      e.preventDefault();

      const { message } = this.state;
      const { user, room } = this.props;

      if (message && message !== "") {
         user.sendMessage({
            text: message,
            roomId: room.id
         });

         this.setState({
            message: ""
         });
      }
   };

   render() {

      const { user, room } = this.props;
      const { open } = this.state;

      return (
         <Container>
            <Form onSubmit={this.onSubmit}>
               <InputGroup>
                  <Input
                     placeholder="Send a Message..."
                     type="text"
                     onInput={e => user.isTypingIn({ roomId: room.id })}
                     value={this.state.message}
                     onChange={this.onMessageChange} />

                  <InputGroupAddon addonType="prepend">
                     <Button onClick={this.onOpenModal}>
                        Gif
                     </Button>

                     <Button color="primary" type="submit">
                        Submit
                     </Button>

                     <Modal open={open} onClose={this.onCloseModal} center>
                        <div className="h2">Search for a Gif</div>
                        <GifSection>
                           <GiphySelect onEntrySelect={this.onGifEntrySelection} />
                        </GifSection>

                        <Button
                           color="primary"
                           onClick={this.onGifSelect}
                           disabled={!this.state.gifLink}>Select</Button>
                     </Modal>
                  </InputGroupAddon>
               </InputGroup>
            </Form>
         </Container>
      );
   }
}

export default CreateMessageInput;
