import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
   height: 100px;
   display: flex;
   flex-direction: row;
   border-bottom: 1px solid lightgray;
   align-items: center; 
`;

const LeftDiv = styled.div`
   display: flex;
   justify-content: center;
   width: 120px;
`;

const RightDiv = styled.div`
   flex-grow: 1;
`;

const AvatarImage = styled.img`
   height: 50px;
   width : 50px;
   float : left;
`;


const ChatMessageList = ({ message = {}, user }) => {

   return (
      <Container>
         <LeftDiv>
            <AvatarImage src="https://image.flaticon.com/icons/svg/149/149071.svg" />
         </LeftDiv>

         <RightDiv>
            <div>
               Details
            </div>

            <div>
               {message.text}
            </div>
         </RightDiv>
      </Container>
   );
}

export default ChatMessageList;