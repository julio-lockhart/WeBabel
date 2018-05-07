import styled from 'styled-components';

export const Container = styled.div`
  display       : flex;
  flex-direction: column;
  align-items   : center;
  list-style    : none;
  background    : #fff;
  overflow-y    : scroll;
  border-left   : 1px solid rgba(0, 0, 0, 0.1);
  width         : 300px;
`;

export const UnorderedList = styled.div`
  padding   : 0;
  margin    : 0 16px;
  overflow-y: auto;
`;

export const Header = styled.h3`
   color          : gray;
   align-items    : center;
   justify-content: center;
   margin-top     : 16px;
`;

export const ListItem = styled.li`

   align-items  : center;
   color        : rgba(0, 0, 0, 0.38);
   font-weight  : bold;
   font-size    : 1rem;
   padding      : 1rem;
   cursor       : pointer;
   width        : 250px;
   border-bottom: 1px solid rgba(0, 0, 0, 0.1);

   img {
      width: 40px;
      height: 40px;
      border-radius: 0.1rem;
      margin-right: 0.62rem;
   }
`;

export const PresenceIndicator = styled.div`

   width                : 8px;
   height               : 8px;
   -moz-border-radius   : 8px;
   -webkit-border-radius: 8px;
   border-radius        : 8px;
   margin-top           : 16px;
   margin-right         : 16px;
   float                : right;
   
   background           : ${props => props.isUserOnline ? 'lightgreen' : 'gray'};
`;