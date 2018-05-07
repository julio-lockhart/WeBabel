import styled from "styled-components";

export const SidebarHeader = styled.header`
  border-bottom   : 1px solid #e0e0e0;
  z-index         : 1;
  flex            : none;
  display         : flex;
  align-items     : center;
  padding         : 1rem;
  height          : 4.8rem;
`;

export const UserName = styled.div`
  font-size  : 1.2rem;
  margin-left: 8px;
  font-weight: normal;
  color      : rgba(0, 0, 0, 0.38);
`;

export const UserImage = styled.img`
  width        : 2.8rem;
  height       : 2.8rem;
  border-radius: 0.38rem;
  background   : #e0e0e0;
`;

export const UserOptions = styled.div`
  margin-left: auto;
`;