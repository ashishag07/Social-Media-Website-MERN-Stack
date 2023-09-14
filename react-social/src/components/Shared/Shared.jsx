import './shared.css'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { AuthContext } from '../../context/AuthContext';
import { useContext,useRef,useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Shared() {
    const [file,setFile] = useState(null);
    const {user} = useContext(AuthContext)
    const inputText = useRef();

    const handleSubmit = async(event)=>{
        event.preventDefault()
        const newPost = {
            userId: user._id,
            description: inputText.current.value
        };
        if(file){
            let formData = new FormData(); 
            const filename = Date.now()+file.name;
            formData.append('name',filename);
            formData.append('file',file);
            newPost.img = filename;
            console.log(newPost);
            try{
                await axios.post('http://localhost:8800/api/upload',formData)
                window.location.reload()
            }
            catch(err){
                console.log(err);
            }

        }
        await axios.post('http://localhost:8800/api/posts',newPost);
        window.location.reload()

        // Submitting the post request 
    };
    
  return (
    <div className='shared'>
        <form className='shared_container' onSubmit={handleSubmit}>
            <div className='shared_top'>
                <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture || '/assets/profile.png'} alt='' className='shared_profileImg'/>
                </Link>    
                <input 
                    placeholder={`What's in your mind ${user.username}`} 
                    className='shared_input'
                    ref={inputText}>
                </input>
            </div>

            <hr className='shared_hr'/>

           <div className='shared_bottom'>

                <div className='shared_options'>

                    <label className='shared_bottomOptions'>
                        <PermMediaIcon htmlColor='tomato' className='shared_bottomIcon'/>
                        <span className='shared_IconText'>Photos/Videos</span>
                        <input
                            style={{display:'none'}} 
                            type='file' 
                            id='file' 
                            accept='.png,.jpeg,.jpg' 
                            onChange={(event)=>setFile(event.target.files[0])}
                        />
                    </label>

                    <div className='shared_bottomOptions'>
                        <LabelIcon htmlColor='SlateBlue' className='shared_bottomIcon'/>
                        <span className='shared_IconText'>Tag</span>
                    </div>

                    <div className='shared_bottomOptions'>
                        <RoomIcon htmlColor='LawnGreen' className='shared_bottomIcon'/>
                        <span className='shared_IconText'>Location</span>
                    </div>

                    <div className='shared_bottomOptions'>
                        <EmojiEmotionsIcon htmlColor='GoldenRod' className='shared_bottomIcon'/>
                        <span className='shared_IconText'>Feeling</span>
                    </div>
                
                </div>

                <button className='shared_bottomButton' type='submit'>Share</button>

            </div>
            
        </form>
    
    </div>
  )
}


export default Shared

