import Topbar from '../../components/Topbar/Topbar';
import Leftbar from '../../components/Leftbar/Leftbar';
import CenterFeedbar from '../../components/CenterFeedbar/CenterFeedbar';
import Rightbar from '../../components/Rightbar/Rightbar';
import './profile.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



function Profile() {
    const params = useParams();
    const [user, setUser] = useState({});
    useEffect(()=>{
        const getUser = async ()=>{
            const fetchUser = await axios.get(`http://localhost:8800/api/users?username=${params.username}`)
            setUser(fetchUser.data);
        }
        getUser();
    },[params.username])
  return (
    <>
    <Topbar /> 
    <div className='profile'>
        <Leftbar />
        <div className='profile_right'>
            <div className='profile_rightTop'>
                <div className='profile_cover'>
                    <img src={user.coverPicture} alt='' className='profile_coverImage'/>
                    <img src={user.profilePicture} alt='' className='profile_profileImage'/>
                </div>
                <div className='profile_info'>
                    <h1 className='profile_infoName'>{user.username}</h1>
                    <span className='profile_infoDescription'>{user.description}</span>
                </div>
                
            </div>
            <div className='profile_rightBottom'>
                <CenterFeedbar username={params.username}/>
                <Rightbar user={user}/>
            </div>
        </div>
        
    </div>    
    </>
    
  )
}

export default Profile

