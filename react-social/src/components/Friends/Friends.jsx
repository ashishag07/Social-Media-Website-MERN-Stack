import './friends.css';


export default function Friends({friend}) {
  return (
    <li className='leftbar_friendsListItem'>
        <img src={friend.profileImage} alt='' className='leftbar_friendImg'/>
        <span>{friend.username}</span>
    </li>  
  )
}
