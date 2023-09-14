import './rightbar.css';
import Online from '../Online/Online';
import { Users } from '../../dummyData';
import Followings from '../followings/Followings';
import { useState,useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { AuthContext } from '../../context/AuthContext';


function Rightbar({user}) {
  
  const HomeRightbar = ()=>{
    return(
      <>
        <div className='birthday'>
            <img src='/assets/gift.png' alt='' className='birthday_img'/>
            <span className='birthday_text'><b>Ashish Agarwal</b> and <b>2 other friends</b> have birthday today.</span>  
        </div>

        <img src='/assets/adv.png' alt='' className='advertisement'/>
        <h4 className='rightbar_title'> Online Friends</h4>
        <ul className='rightbar_friendsList'>
          {
            Users.map(user=>
            <Online key={user.id} user={user}/>
          )}
        </ul>
      </>
    )
  }

  const ProfileRightbar = ()=>{

  const [friends, setFriends] = useState([]); //state use to fetch all the friends
  const username = useParams().username;
  console.log(`I am username: ${username}`);
  const {user:currentUser,dispatch} = useContext(AuthContext);
  const [follow,setFollow] = useState(user.followings?.includes(currentUser?._id)); // state use to follow or unfollow the profile


  
  useEffect(()=>{
    const getFriends = async ()=>{
      try{
        if(user){
          const friendList = await axios.get('http://localhost:8800/api/users/friends/'+user._id);
          setFriends(friendList?.data);
        }
      }
      catch(err){
        console.log(err)
      }
    }
    getFriends();
  },[])

    const params = useParams();
    const [users, setUsers] = useState({});

    useEffect(()=>{
      const fetchUser = async ()=>{
        const user = await axios.get(`http://localhost:8800/api/users?username=${params.username}`)
        setUsers(user.data);
      }
      fetchUser();

    },[params.username])

    const handleFollowClick = async()=>{
      try{
        if(follow){
            console.log(user._id)

             await axios.put(`http://localhost:8800/api/users/${currentUser?._id}/unfollow`,{userId:user._id});
             dispatch({type:'UNFOLLOW',payload:user?._id})             
        }
        else{
          await axios.put(`http://localhost:8800/api/users/${currentUser?._id}/follow`,{userId:user?._id});
          dispatch({type:'FOLLOW',payload:user?._id})
        } 
             
        setFollow(!follow)
      }
      catch(err){
        console.log(err)
      }
      
    }
    
    return(
      <>
        {username !== currentUser.username && (
          <button class="rightbar_followButton" onClick={handleFollowClick}>
            {follow?"Unfollow":"Follow"}
            {follow?<RemoveIcon/>:<AddIcon/>}
          </button>
        )}
      
        
        
        <h4 className='profile_rightbarTitle'>User Information</h4>
        <div className='profile_userInfo'>
          <div className='profile_userInfoItems'>
            <span className='profile_userInfoKey'>City:</span>
            <span className='profile_userInfoValue'>{users.city}</span>
          </div>
          <div className='profile_userInfoItems'>
            <span className='profile_userInfoKey'>From:</span>
            <span className='profile_userInfoValue'>{users.from}</span>
          </div>
          <div className='profile_userInfoItems'>
            <span className='profile_userInfoKey'>Relationship:</span>
            <span className='profile_userInfoValue'>{users.relationship ===1? "Single" : users.relationship===2? "Married": "Complicated"}</span>
          </div>
        </div>
        
        <div className='followings'>
          <span>Followings</span>
          <div className='profile_followings'>
            {
              friends.map((friend)=>(
                <Link to =
                {`/profile/${friend.username}`}
                style={{textDecoration:'none'}}
                >
                  <div className='profile_following'>
                  <img src={friend.profilePicture} alt='' className='followingImage'/>
                  <span className='followingName'>{friend.username}</span>
                  </div> 
                </Link>            
                
              ))
            }
          </div>
          
        </div>

      </>
    )
  }

  return(
    <div className="rightbar">
      <div className='rightbar_container'>        
       {user?<ProfileRightbar/>:<HomeRightbar/>}
      </div>      
    </div>
  ) 
}

export default Rightbar