import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout(){
    const navigate=useNavigate()
    const queryClient=useQueryClient()
    const {mutate:logout,isLoading}=useMutation({
        mutationFn:logoutApi,
        onSuccess:()=>{
            queryClient.removeQueries()
            navigate('/login',{replace:true})//يعني أنه بدلاً من إضافة صفحة تسجيل الدخول إلى تاريخ المتصفح، سيتم استبدال الصفحة الحالية (التي كان عليها المستخدم) بصفحة تسجيل الدخول. هذا يعني أنه إذا قام المستخدم بالضغط على زر "رجوع" في المتصفح بعد ذلك، فلن يعود إلى الصفحة السابقة.
        }
    })

    return {logout,isLoading}
}