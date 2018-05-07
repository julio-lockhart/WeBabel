import styled from "styled-components";

export const Container = styled.div`
  display    : flex;
  height     : 100vh;
  font-size  : 16px;
  margin     : 0;
`;

export const Main = styled.div`
  display   : flex;
  margin    : auto;
  width     : 100%;
  height    : 100%;
  overflow  : hidden;
`;

export const SideBar = styled.aside`
  width           : 360px;
  display         : flex;
  flex-direction  : column;
  border-right    : 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 700px) {
    position  : absolute;
    left      : 0;
    top       : 4.8rem;
    bottom    : 0;
    transform : translateX(-100%);
    transition: transform 0.2s ease-out;
    box-shadow: 0 0 0.38rem rgba(0, 0, 0, 0.1);
  }
`;

export const ChatSection = styled.div`
  flex            : 1 0 0;
  width           : 100%;
  display         : flex;
  flex-direction  : column;
  position        : relative;
  background-color: rgba(250, 250, 250, 0.5);
`;

export const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  border       : 16px solid #f3f3f3;       /* Light grey */
  border-top   : 16px solid #3498db;       /* Blue */
  border-radius: 50%;
  width        : 120px;
  height       : 120px;
  animation    : spin 2s linear infinite;
  
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
   }
`;