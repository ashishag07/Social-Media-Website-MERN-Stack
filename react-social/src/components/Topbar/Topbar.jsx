import React, { useContext } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import './topbar.css'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';


function Topbar() {
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbar">
      <div className="topbar_left">
      <Link to='/' style={{textDecoration:'none'}}>
        <span className="topbar_leftLogo">H! Buddies</span>
      </Link>
      </div>

      <div className="topbar_center">
        <div className='topbar_centerSearchbar'>
            <SearchIcon className='topbar_centerSearchIcon'/>
            <input placeholder="Search for friends, posts, videos" className='topbar_centerInputSearch'></input>
        </div>
        
      </div>

      <div className="topbar_right">
        <div className="topbar_rightLinks">
          <span className="topbar_rightLinksItems">Homepage</span>
          <span className="topbar_rightLinksItems">Timeline</span>
        </div>

        <div className="topbar_rightIcons">
          <div className="topbar_rightIconsItems">
            <PersonIcon />
            <span className="topbar_rightIconsBage">1</span>
          </div>

          <div className="topbar_rightIconsItems">
            <ChatIcon />
            <span className="topbar_rightIconsBage">2</span>
          </div>

          <div className="topbar_rightIconsItems">
            <NotificationsIcon />
            <span className="topbar_rightIconsBage">1</span>
          </div>
        </div>
        <Link to = {`/profile/${user.username}`}>
          <img 
          src={user.profilePicture || PF+'profile.png'} 
          alt="" 
          className='topbar_rightImg'
          />
        </Link>
      </div>
    </div>
  );
}

export default Topbar