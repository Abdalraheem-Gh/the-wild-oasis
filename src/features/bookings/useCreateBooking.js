
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUpdateBooking } from "../../services/apiBookings";

export function useCreateBooking(){
        
    const queryClient=useQueryClient()
    
    const {mutate:createBooking,isLoading:isCreating}=useMutation({
  mutationFn:createUpdateBooking,
  onSuccess:()=>{toast.success('New booking successfully created');
    queryClient.invalidateQueries(['bookings']);
},
onError:(err)=>toast.error(err.message)

})
return {createBooking,isCreating}
}