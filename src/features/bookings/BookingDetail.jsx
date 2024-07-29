import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useBooking } from "../bookings/useBooking.js";
import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from '../../ui/Spinner.jsx'
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout.js";
import { useDeleteBooking } from "./useDeleteBooking.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate=useNavigate()
  const {checkout,isCheckingOut}=useCheckout()

  const {booking,isLoading} = useBooking();
  const moveBack = useMoveBack();
  const {deleteBooking,isDeleting}=useDeleteBooking()
  
  if(isLoading)return <Spinner/>
  if (!booking) return <div>Booking data not found.</div>;
  const {status,id:bookingId}=booking;  
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };


  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
      <Button  onClick={()=>navigate(`/checkin/${bookingId}`)} >Check in</Button>   

      
      {status==='checked-in'  && 
<Button icon={<HiArrowUpOnSquare/>} onClick={()=>checkout(bookingId)} disabled={isCheckingOut} >Check out</Button>}
{/* <Button icon={<HiTrash/>} disabled={isDeleting} onClick={()=>handleDeleteBooking(bookingId)}>Delete Booking</Button>         */}

<Modal>

<Modal.Open opens='delete'>
  <Button variation='danger' >Delete booking</Button>
</Modal.Open>

<Modal.Window name='delete'>
                      <ConfirmDelete resourceName='booking' disabled={isDeleting} onConfirm={()=>deleteBooking(bookingId,{onSettled:()=>navigate(-1)})} />
                    </Modal.Window>
</Modal>
<Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
