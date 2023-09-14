import './online.css'
function Online({user}) {
  return (
    <li className='rightbar_friends'>
        <div className='rightbar_friendProfile'>
            <img src={user.profileImage} alt='' className='rightbar_friendImg'/>
            <span className='rightbar_friendName'>{user.username}</span>
        </div>
        <span className='rightbar_onlineBadge'></span>
    </li>
  )
}

export default Online