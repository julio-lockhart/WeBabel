import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
   flex  : 1;
   margin: 16px;
   display               : -webkit-flex;
   -webkit-flex-direction: column;
   flex-direction        : column;

   ul {
      overflow-y: scroll;
   }
`;

class ChatMessageList extends Component {
   render() {
      return (
         <Container>
            <ul>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
               <li>This is the content that</li>
            </ul>
         </Container>
      );
   }
}

export default ChatMessageList;