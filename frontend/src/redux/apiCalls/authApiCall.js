import { authActions } from "../slices/authSclice";
import request from "../../utils/request";
import {toast} from 'react-toastify'
//Login user

export function loginUser(user){
    return async (dispatch) => {
        try {
            // const response = await fetch("http://localhost:8000/api/auth/login",{
            //     method: "POST",
            //     body: JSON.stringify(user),
            //     headers: {
            //         'Content-Type': 'application/json',
            //     }
            // })
            // const data  =  await response.json()
            const {data} = await request.post("/api/auth/login",user)
            dispatch(authActions.login(data))
            localStorage.setItem('userInfo',JSON.stringify(data))
        } catch (error) {
            toast.error(error.response.data.error)
            console.log(error.response.data.error);
        }
    }
}


export function logoutUser(user){
    return (dispatch)=>{
        dispatch(authActions.logout())
        localStorage.removeItem('userInfo')
    }
}

