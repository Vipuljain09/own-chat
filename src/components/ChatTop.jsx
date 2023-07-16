import { useContext } from 'react'
import '../style.scss'
import { ChatContext } from '../context/ChatContext'

const ChatTop = (props) => {
  const {data} = useContext(ChatContext);

  const backArrowHandler=()=>{
    props.onChangeFlg();
  }
  
  return (
    <div className='chatTop'>
      <span className='title'>
      <i className="backArrow fa-solid fa-arrow-left" onClick={backArrowHandler}></i>
      {data.user.displayName}</span>
      <div className="chatTopIcons">
      <i className="chatTopIcon fa-solid fa-video"></i>
      <i className="chatTopIcon fa-solid fa-user-plus"></i>
      <i className="chatTopIcon fa-solid fa-ellipsis"></i>
      </div>
    </div>
  )
}

export default ChatTop
