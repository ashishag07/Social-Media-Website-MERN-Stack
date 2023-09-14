import './message.css'
// {own?'message own':'message'}
function Message({own}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className={own?'message own':'message'}>
        <div className='message_top'>
            <img src={PF+"profile/NatashaRomanoff.png"} alt='' className='message_img'/>
            <p className='message_text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        </div>
        <span className='message_botton'>1 hr ago</span>
    </div>
  )
}

export default Message