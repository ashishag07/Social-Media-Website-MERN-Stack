import './conversation.css'

function Conversation() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (    
    <div className="conversation">
        <img src={PF+"profile/NatashaRomanoff.png"} alt="" className="conversation_img"/>
        <span className="conversation_text">Natasha Romanoff</span>
    </div>
  )
}

export default Conversation