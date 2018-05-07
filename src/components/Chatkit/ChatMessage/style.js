import styled from 'styled-components';
import MicrolinkCard from 'react-microlink';

export const Container = styled.div`
   min-height : 100px;
   display    : flex;
   border-top : 1px solid #eeeeee;
   align-items: center;
   padding    : 8px 0px;

   flex-direction        : ${props => props.isCurrentUser ? 'row-reverse' : 'row'};
   -webkit-flex-direction: ${props => props.isCurrentUser ? 'row-reverse' : 'row'};
`;

export const ImageContainer = styled.div`
  display        : flex;
  justify-content: center;
  width          : 120px;
  min-width      : 120px;
`;

export const MessageContainer = styled.div`
word-break: break-word;
max-width : 40%;
`;

export const AvatarImage = styled.img`
  height: 50px;
  width : 50px;
  float : left;
`;

export const MessageDetails = styled.div`
  font-size: 0.749em;
  opacity  : 0.54;
  padding  : 8px 0px;

  text-align: ${props => props.isCurrentUser ? 'right' : 'left'};

  span {
    opacity: 1;
    color  : #0d47a1;
  }
`;

export const MessageText = styled.div`
  font-size    : 0.998em;
  border-radius: 25px;
  padding      : 20px;
  display      : inline-block;
  margin-bottom: 8px;
  float        : ${props => props.isCurrentUser === true ? 'right' : '#left'};

  background-color: ${props => props.isCurrentUser === true ? '#2196F3' : '#EEEEEE'};
  color           : ${props => props.isCurrentUser === true ? 'white' : 'black'};
`;

export const PresenceIndicator = styled.div`
   display              : inline-block;
   width                : 8px;
   height               : 8px;
   -moz-border-radius   : 8px;
   -webkit-border-radius: 8px;
   border-radius        : 8px;
   margin-bottom        : 1px;
   
   background: ${props => props.isUserOnline ? 'lightgreen' : 'gray'};
`;

export const CustomMicrolinkCard = styled(MicrolinkCard) `
  max-width    : 100%;
  border-radius: .42857em;
  clear:both;
`;