

import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"
import styled from "styled-components"
import SidebarDropdown from "./SidebarDropdown"
import { DropdownProvider } from "../context/DropdownContext"

const StyledAppLayout=styled.div`
    display: grid;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;

    @media (max-width: 768px) {
        grid-template-columns:1fr;

  }
`

const Main=styled.main`
    background-color: var(--color-grey-50);
    padding: 4rem 4.8rem 6.4rem;
    overflow:scroll;
    @media (max-width: 768px) {
       padding:2rem 2.4rem 3.2rem;

  }
`

const Container=styled.div`
    margin:0 auto ;
    max-width: 120rem;
    display: flex;
    flex-direction: column;
    gap: 3.2rem ;
`
function AppLayout() {
    return (
        <DropdownProvider>
        <StyledAppLayout>
            <Header/>
            <Sidebar/>
            <Main>
            <SidebarDropdown/>
                <Container>
                    <Outlet/>
                </Container>
            </Main>
        </StyledAppLayout>
        </DropdownProvider>
    )
}

export default AppLayout


