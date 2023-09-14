export const AuthReducer = (state,action)=>{

    switch(action.type){
        case 'LOGIN_START':
            return{
                user: null,
                isFetching: true,
                error: false
            }
        case 'LOGIN_SUCCESS':
            return{
                user: action.payload,
                isFetching: false,
                error: false
            }
        case 'LOGIN_FALIURE':
            return{
                user: null,
                isFetching: false,
                error: action.payload
            }
        case 'FOLLOW':
        return{
            ...state, //every previous states
            user:{
                ...state.user, // every previous states except change in user state
                followings:[...state.user.followings, action.payload] // every previous followings, also the new follower
            }
        }
        case 'UNFOLLOW':
        return{
            ...state, //every previous states
            user:{
                ...state.user, // every previous states except change in user state
                followings:[...state.user.followings].filter(following=>following!==action.payload) // every previous followings, also filter the existing follower
            }
        }
        default:
            throw new Error (`No case for type ${action.type} found in shop reducer hook.`);
    }
}