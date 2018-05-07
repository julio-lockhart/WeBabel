import styled from "styled-components";

export const Container = styled.div`
  border-top: 1px solid #e0e0e0;
  height    : 3.6rem;

  form {
    height: 100%;
  }

  .input-group {
    height       : 100%;
    display      : flex;
    align-content: stretch;
  }

  .input-group > input {
    flex   : 1 0 auto; 
    padding: 8px;
  }
`;

export const GifSection = styled.div`
  margin-bottom: 8px;
`;