import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner  from '../../ui/Spinner'
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import {useCabins} from '../cabins/useCabins'
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr ;
  grid-template-rows: auto auto;
  gap: 2.4rem;
  
  @media (max-width: 768px){
    display: grid;
    grid-template-columns:1fr;
    grid-template-rows:auto;
    gap: 1.6rem;
}
`;
const StyledFlexData = styled.div`
display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 2.4rem;
  @media (max-width: 768px){
  display: flex;
  flex-direction: column; 
  gap: 1.6rem; 
    }
`

function DashboardLayout() {
  const {bookings,isLoading:isLoading1}=useRecentBookings()
  const {confirmedStays,isLoading:isLoading2,numDays}=useRecentStays()
  const {cabins,isLoading:isLoading3}=useCabins()
  if(isLoading1||isLoading2||isLoading3)return <Spinner/>
  return (
        <StyledDashboardLayout>
              <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length}/>             
              
              <StyledFlexData>
              <TodayActivity/>
              <DurationChart confirmedStays={confirmedStays}/>
              <SalesChart bookings={bookings} numDays={numDays}/>
              </StyledFlexData>
        </StyledDashboardLayout>
  )
}

export default DashboardLayout
