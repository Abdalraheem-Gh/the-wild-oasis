
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import CreateBookingForm from "./CreateBookingForm"

function BookingAddBook() {
    return (
        <div>
            <Modal>
            <Modal.Open opens='booking-form'>
                <Button>ADD NEW ACTIVTY</Button>
            </Modal.Open>
        <Modal.Window name='booking-form'>
            <CreateBookingForm/>
        </Modal.Window>
        </Modal>
        </div>
    )
}

export default BookingAddBook
