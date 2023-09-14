import './messenger.css'
import Conversation from '../../components/Conversation/Conversation'
import Topbar from "../../components/Topbar/Topbar";
import Message from '../../components/Message/Message';
import ChatOnline from '../../components/ChatOnline/ChatOnline';


function Messenger() {
        
  return (
    <>
        <Topbar/>
        <div className="messenger">
            <div className="chatMenuContainer">
                <div className="chatMenu">   
                    <input placeholder="Search for chat" className='chatMenu_input'/>        
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                    <Conversation/>
                </div>
            </div>

            <div className="chatBoxContainer">
                <div className='chatBox_top'>
                    <Message/>
                    <Message/>
                    <Message own={true}/>
                    <Message/>
                    <Message own={true}/>
                    <Message/>
                </div>

                <div className='chatBox_bottom'>
                    <textarea placeholder='write something..' className='chatBox_textInput'></textarea>
                    <button className='chatBox_button'>Send</button>
                </div>
            </div>
            <div className="chatOnlineContainer">
                <ChatOnline/>                
                <ChatOnline/>                
                <ChatOnline/>                
                <ChatOnline/>                
            
            </div>
        
        </div>
    </>
    )
}

export default Messenger;