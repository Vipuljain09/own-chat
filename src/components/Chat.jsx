import '../style.scss';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import ChatTop from './ChatTop';

const Chat = (props) => {
  
  return (
    <div className={`chat ${props.className?props.className:""}`}>
      <ChatTop onChangeFlg={props.onChangeFlg}></ChatTop>
      <ChatMessages></ChatMessages>
      <ChatInput></ChatInput>
    </div>
  )
}

export default Chat
