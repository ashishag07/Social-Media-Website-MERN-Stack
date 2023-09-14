import './post.css';
import {Link} from 'react-router-dom'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import * as timeago from 'timeago.js';
import {AuthContext} from "../../context/AuthContext"



function Post({post}) {
    const [like, setLike] = useState(post?.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const {user:currentUser} = useContext(AuthContext);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    // to fetch the users from the server     
    useEffect(()=>{
        const fetchUsers = async ()=>{
            const response = await axios.get (`http://localhost:8800/api/users?userId=${post.userId}`);
            setUser(response.data);
        }
        fetchUsers();
    },[post.userId])

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id,post.likes])
    
    const handleLike = async ()=>{
        await axios.put(`http://localhost:8800/api/posts/${post._id}/like`,{userId: currentUser._id})
        setLike(isLiked?like-1:like+1)
        setIsLiked(!isLiked);
    }

    const date = new Date(post?.createdAt);
    const dateFormat = timeago.format(date)
    
  return (
    <div className='post'>

        <div className='post_container'>
        
            <div className='post_top'>
                <div className='post_topLeft'>
                    <Link to={`/profile/${user.username}`}>
                        <img src={user?.profilePicture || PF+'profile.png'} alt='' className='post_userImg'/>
                    </Link>
                    <span className='post_username'>{user?.username}</span>
                    <span className='post_date'>{dateFormat}</span>
                </div>

                <div className='post_topRight'>
                    <MoreHorizIcon/>
                </div>

            </div>                            
            
            <div className='post_center'>
                <span className='post_text'>{post?.description}</span>
                <img src={post?.img} alt='' className='post_img' />
            </div>
            
            <div className='post_bottom'>

                <div className='post_bottomLeft'>
                    <img src='/assets/like.png' alt='' className='post_like' onClick = {handleLike}/>
                    <img src='/assets/heart.png' alt='' className='post_like' onClick = {handleLike}/>
                    <span className='likes_counter'>{like}</span>
                </div>

                <div className='post_bottomRight'>
                    <span className='post_comments'>{post?.comment} Comments</span>
                </div>
                
            </div>           
            
        </div>
    
    </div>
  )
}

export default Post