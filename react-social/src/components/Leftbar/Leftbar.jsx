import './leftbar.css'
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpIcon from '@mui/icons-material/Help';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import Friends from '../Friends/Friends';

import { Users } from '../../dummyData';

function Leftbar() {
  return (
    <div className='leftbar'>
      
      <div className='leftbar_container'>
        <ul className='leftbar_list'>
          <li className='leftbar_listItem'>
            <RssFeedIcon className='leftbar_listIcon'/>
            <span>Feed</span>
          </li>

          <li className='leftbar_listItem'>
            <ChatIcon className='leftbar_listIcon'/>
            <span>Chat</span>
          </li>

          <li className='leftbar_listItem'>
            <VideoLibraryIcon className='leftbar_listIcon'/>
            <span>Videos</span>
          </li>

          <li className='leftbar_listItem'>
            <GroupIcon className='leftbar_listIcon'/>
            <span>Groups</span>
          </li>

          <li className='leftbar_listItem'>
            <BookmarkIcon className='leftbar_listIcon'/>
            <span>Bookmarks</span>
          </li>

          <li className='leftbar_listItem'>
            <HelpIcon className='leftbar_listIcon'/>
            <span>Qusetion</span>
          </li>

          <li className='leftbar_listItem'>
            <WorkIcon className='leftbar_listIcon'/>
            <span>Work</span>
          </li>

          <li className='leftbar_listItem'>
            <EventIcon className='leftbar_listIcon'/>
            <span>Events</span>
          </li>

          <li className='leftbar_listItem'>
            <SchoolIcon className='leftbar_listIcon'/>
            <span>Courses</span>
          </li>        
        </ul>

        <button className='leftbar_button'>Show more</button>
        
        <hr className='leftbar_hr'/>

        <ul className='leftbar_friendsList'>
          {
            Users.map(user=>
              <Friends key={user.id} friend={user}/>
              )
          }
          
        </ul>

      </div>

    </div>
  )
}

export default Leftbar
