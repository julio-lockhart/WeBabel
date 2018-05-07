import styled, { css } from 'styled-components';

export const RoomDetailContainer = styled.ul`
  width        : 100%;
  padding      : 0;
  margin       : 8px 0;
  border-bottom: 1px solid #CFD8DC;

  &:hover {
    background: #fafafa;
  }
`;

export const RoomDetail = styled.div`
  height: 80px;
  width : 100%;
`;

export const AvatarImage = styled.img`
  height: 50px;
  width : 50px;
  float : left;
`;

export const Grid = styled.div`
  display        : flex;
  flex-wrap      : nowrap;
  flex-direction : row;
  justify-content: space-between;
`;

export const DetailColumn = styled.div`
  display       : flex;
  flex-direction: column;

  ${props => {
      if (props.side === 'left') {
         return `
            margin-left: 8px;
            max-width  : 210px;
            flex: 1;
         `;
      } else if (props.side === 'right') {
         return `
            
         `;
      }
   }}
`;

export const OverflowSpan = css`
   white-space  : nowrap;
   overflow     : hidden;
   text-overflow: ellipsis;
`;

export const RoomNameStyle = styled.span`
   ${OverflowSpan};
   font-size: 1em;
`;

export const LastMessageSentStyle = styled.span`
   ${OverflowSpan};
   margin-top: 8px;
   font-size : 0.749em;
   opacity   : 0.6;
`;