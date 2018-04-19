import React, { Component } from 'react';
import { Button, ButtonGroup, ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import styled from 'styled-components';

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

class RoomHeader extends Component {
   constructor(props) {
      super(props);

      this.state = {
         room: this.props.room,
         dropdownOpen: false
      }

      this.toggle = this.toggle.bind(this);
   }

   // Toggling the dropdown
   toggle() {
      this.setState({
         dropdownOpen: !this.state.dropdownOpen
      });
   }

   componentDidUpdate(prevProps) {
      if (prevProps.room.id !== this.state.room.id) {
         this.setState({
            room: prevProps.room
         });
      }
   }

   render() {
      const { room } = this.state;
      console.log(room.users);

      return (
         <Container>
            <Title>{room.name}</Title>

            <ButtonGroup >
               <Button>1</Button>
               <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle caret size="sm" />
                  <DropdownMenu>
                     <DropdownItem>Add a User</DropdownItem>
                     <DropdownItem style={{ color: 'red' }}>Leave Chat</DropdownItem>
                  </DropdownMenu>
               </ButtonDropdown>
            </ButtonGroup>
         </Container>
      );
   }
}

export default RoomHeader;