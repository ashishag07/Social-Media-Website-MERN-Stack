export const LoginStart = (userDetails)=>({
    type: 'LOGIN_START'
});

export const LoginSuccess =(user)=>({
    type: 'LOGIN_SUCCESSFUL',
    payload: user
});

export const LoginFaliure = (error)=>({
    type: 'LOGIN_FAILIURE',
    payload: error
});

export const Follow = (userId)=>({
    type:"FOLLOW",
    payload:userId
});

export const Unfollow = (userId)=>({
    type:"UNFOLLOW",
    payload:userId
});
    
