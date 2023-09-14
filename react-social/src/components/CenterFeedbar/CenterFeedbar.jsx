// imported components
import './centerFeedbar.css'
import Shared from '../Shared/Shared'
import Post from '../posts/Post'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'

// import {Posts} from '../../dummyData.js'

function CenterFeedbar({username}) {
  const [posts, setPosts] = useState([]);
  const user = useContext(AuthContext)

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const response = username
      ?await axios.get('http://localhost:8800/api/posts/profile/'+username)
      :await axios.get(`http://localhost:8800/api/posts/timeline/${user.user._id}`)
      setPosts(
        response.data.sort((p1,p2)=>(new Date(p2.createdAt)) - new Date(p1.createdAt))
        );
    }
    fetchPosts();
  },[username,user.user._id])

  return (
    <div className='feedbar'>

      <div className='feedbar_container'>
        {username===user.username && <Shared />}
        {
          posts.map((post)=>{
            return <Post key= {post._id} post= {post}/>
          })
        }
        </div>

    </div>
  )
}

export default CenterFeedbar