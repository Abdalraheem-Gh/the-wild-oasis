import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser(){

    const queryClient=useQueryClient()
    
    const {mutate:updateUser,isLoading:isUpdating}=useMutation({
        mutationFn:updateCurrentUser,
        onSuccess:(user)=>{toast.success('User account successfully updated');
             queryClient.setQueryData(['user'],user) //update data manuely in the cach //--كأن عم حط اليوزبر الجديد المحدث  بأيدي بالكاش 
            // queryClient.invalidateQueries(['user']);
        },
        onError:(err)=>toast.error(err.message)
        
    })
return {updateUser,isUpdating}
}
