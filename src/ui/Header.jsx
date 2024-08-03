import styled from "styled-components"
import HeaderMenu from "./HeaderMenu"
import UserAvatar from '../features/authentication/UserAvatar'
import Logo from "./Logo"
const StyledHeader=styled.header`
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-100);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 2.4rem;

    @media (max-width: 768px) {
        padding: 1.2rem 2.4rem;
        justify-content: space-between;
    }
`
const HeaderLeft = styled.div`
@media (max-width: 768px){
    display: flex;
    align-items: center;
    gap: 2.4rem;
}
@media (min-width: 768px){
    display: none;

}
`;
function Header() {
    return (
        <StyledHeader>
            <HeaderLeft>
            <Logo/>
            </HeaderLeft>
            <div>
            <UserAvatar/>
            <HeaderMenu/> 
            </div>
        </StyledHeader>
    )
}

export default Header
