import React, { Component } from "react";
import { Form, InputGroup, InputGroupAddon, Input, Button } from "reactstrap";
import styled from "styled-components";

const Container = styled.div`
  border-top: 1px solid #e0e0e0;
  height: 3.6rem;

  form {
    height: 100%;
  }

  .input-group {
    height: 100%;
    display: flex;
    align-content: stretch;
  }

  .input-group > input {
    flex: 1 0 auto;
    padding: 8px;
  }
`;

class CreateMessageInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      room: this.props.room,
      message: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onMessageChange = event => {
    this.setState({
      message: event.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { user, room, message } = this.state;

    user.sendMessage({
      text: message,
      roomId: room.id
    });

    this.setState({
      message: ""
    });
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.onSubmit}>
          <InputGroup>
            <Input
              placeholder="Send a Message..."
              type="text"
              value={this.state.message}
              onChange={this.onMessageChange}
            />
            <InputGroupAddon addonType="prepend">
              <Button color="primary" type="submit">
                Submit
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Form>
      </Container>
    );
  }
}

export default CreateMessageInput;
