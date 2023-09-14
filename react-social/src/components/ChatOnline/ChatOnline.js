import './chatOnline.css'

function ChatOnline() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className='chatOnline'>
        <div className='chatOnline_friend'>
            <img className='chatOnline_img' alt='' src={PF+"profile/NatashaRomanoff.png"}/>
            <span className='chatOnline_name'>Natasha Romanoff</span>
            <div className='chatOnline_badge' />
        </div>                
    </div>
  )
}

export default ChatOnline