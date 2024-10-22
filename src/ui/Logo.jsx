import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";
import { useNavigate } from "react-router-dom";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
  @media (max-width: 768px){
    height: 4.7rem;
    width: auto;
  }
`;

function Logo() {
  const navigate=useNavigate()
  const {isDarkMode}=useDarkMode();
  const src=isDarkMode?"/logo-dark.png":"/logo-light.png"
  function handelMoveToHome(){
    navigate('/')
  }
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" onClick={handelMoveToHome}/>
    </StyledLogo>
  );
}

export default Logo;
