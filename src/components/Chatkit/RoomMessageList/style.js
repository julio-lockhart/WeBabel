import styled from 'styled-components';

export const Container = styled.div`
  margin                : 8px;
  display               : -webkit-flex;
  -webkit-flex-direction: column;
  flex-direction        : column;
`;

export const ContainerList = styled.ul`
  flex        : 1 1 auto;
  -webkit-flex: 1 1 auto;
  overflow-y  : auto;
  min-height  : 0px;
  padding     : 0;
  margin      : 0;
`;