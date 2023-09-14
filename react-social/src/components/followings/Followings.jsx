import './followings.css'

function Followings({following}) {
  return (
    <div className='profile_following'>
        <img src={following.profileImage} alt='' className='followingImage'/>
        <span className='followingName'>{following.username}</span>
    </div>
  )
}

export default Followings