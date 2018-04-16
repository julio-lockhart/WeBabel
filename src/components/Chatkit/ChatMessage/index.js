import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
   position: relative;
   display: flex;
   flex: none;
   font-size: 16px;
   padding-top: 1rem;

   img {
      flex: none;
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 0.38rem;
   }
`;



const ChatMessageList = ({ message = {}, user }) => {

   return (
      <div>{message.text}</div>
   );
}

export default ChatMessageList;