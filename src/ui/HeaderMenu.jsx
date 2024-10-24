import styled from "styled-components"
import ButtonIcon from '../ui/ButtonIcon'
import Logout from '../features/authentication/Logout'
import { HiOutlineUser } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"
import DarkModeToggle from "./DarkModeToggle"
const StyledHeaderMenu=styled.ul`
    display: flex;
    justify-content: space-between;
    gap: 0.4rem;
`
function HeaderMenu() {
const navigate=useNavigate()
    
    return <StyledHeaderMenu>
        <li><ButtonIcon onClick={()=>navigate('/account')}><HiOutlineUser/></ButtonIcon></li>
        <li><DarkModeToggle/></li>
        <li><Logout/></li>
    </StyledHeaderMenu>

}

export default HeaderMenu
