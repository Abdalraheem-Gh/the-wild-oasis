import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineCog6Tooth, HiOutlineHome, HiOutlineHomeModern, HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineCalendar } from "react-icons/hi";
import { useDropdown } from '../context/DropdownContext';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
    @media(max-width: 768px){
      font-size: 1rem;
      font-weight: 300;
      padding: 0.7rem 1.8rem;
      gap: 1rem;

    }
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
    @media(max-width: 768px){
      width: 1.4rem;
      height: 1.4rem;
  }}

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  const { closeDropdown } = useDropdown();

  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to='/dashboard' onClick={closeDropdown}>
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/bookings' onClick={closeDropdown}>
            <HiOutlineCalendar />
            <span>Booking</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/cabins' onClick={closeDropdown}>
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/users' onClick={closeDropdown}>
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/settings' onClick={closeDropdown}>
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;