import styled from "styled-components";

export const Container = styled.div`
  flex                  : 1;
  margin                : 16px;
  display               : -webkit-flex;
  -webkit-flex-direction: column-reverse;
  flex-direction        : column-reverse;
`;

export const UnorderedList = styled.ul`
  padding   : 0;
  margin    : 0 16px;
  overflow-y: auto;
`;

export const EmptyListContainer = styled.div`
   display        : flex;
   align-items    : center;
   justify-content: center;
   flex-direction : column;
   height         : 100vh;
`;