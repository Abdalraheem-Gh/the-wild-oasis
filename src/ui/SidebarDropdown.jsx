import styled from 'styled-components';
import { HiOutlineMenu } from 'react-icons/hi';
import MainNav from './MainNav';
import { useOutsideClick } from '../hooks/useOutsideClick';
import {useDropdown}  from '../context/DropdownContext';

const DropdownContainer = styled.div`
    display: none;
    @media (max-width: 768px) {
    display: block;
    position: relative;
    }
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 1rem;
  font-size: 2rem;
  color: var(--color-grey-900);
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--color-grey-0);
  width: 100%;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-grey-100);
  padding: 1rem; 
`;

const DropdownLogo = styled.div`
  margin-bottom: 1rem;
`;
function SidebarDropdown() {
    const {isOpen,toggleDropdown,closeDropdown }=useDropdown()

    const ref=useOutsideClick(closeDropdown,false);
  
    return (

      <DropdownContainer ref={ref}>
        <DropdownButton onClick={toggleDropdown}>
          <HiOutlineMenu />
        </DropdownButton>
        <DropdownContent show={isOpen}>
        <DropdownLogo>
                </DropdownLogo>          
                <MainNav/>
        </DropdownContent>
      </DropdownContainer>
    );
  }
  
  export default SidebarDropdown;