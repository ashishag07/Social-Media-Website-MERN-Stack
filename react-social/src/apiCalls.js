import axios from "axios";

export const loginCall = async (userDetails, dispatch)=>{
    dispatch({type:'LOGIN_START'});
    try{
        const res = await axios.post('http://localhost:8800/api/auth/login',userDetails)
        dispatch({type:'LOGIN_SUCCESS', payload:res.data})
    }
    catch (error){
        dispatch({type: 'LOGIN_FALIURE', payload:error})
    }
}