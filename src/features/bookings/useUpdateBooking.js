
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useUpdateBooking(){
  const {bookingId}=useParams()

    const queryClient=useQueryClient()
    
    const {mutate:updateBooking,isLoading:isUpdating}=useMutation({
  mutationFn:({newBookingData,id})=>createUpdateBooking(newBookingData,id),
  onSuccess:(data)=>{
    toast.success('Booking successfully updated');
    queryClient.invalidateQueries(['booking',bookingId]);
    queryClient.invalidateQueries(['bookings']);
    if (data.guestId) {
      queryClient.invalidateQueries(['guests', data.guestId]);
  }




  },
onError:(err)=>toast.error(err.message)

})
return {updateBooking,isUpdating}
}