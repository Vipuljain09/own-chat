import { useContext, useEffect, useRef } from "react";
import "../style.scss";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Timestamp } from "firebase/firestore";

const ChatMessage = ({message}) => {
  
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  
  const seconds = (Timestamp.now()-message.time);
  const minutes = Math.floor(seconds/60);
  const hours = Math.floor(seconds/3600);
  const days = Math.floor(hours/24);
  //console.log(seconds,minutes,hours,days);
  let messageTime='recently';
  if(days!==0){messageTime=`${days} day ago`}
  else if(hours!==0){messageTime=`${hours} hour ago`}
  else if(minutes!==0){messageTime=`${minutes} min ago`}

  //console.log(messageTime);
  const ref = useRef();

  useEffect(()=>{
    ref.current?.scrollIntoView({behaviour:"smooth"});
  },[message])

  return (
    <div ref = {ref} className={`chatMessage ${message.sendId===currentUser.uid && "owner"}`}>
        <div className="chatMessageInfo">
          <img
            src={message.sendId===currentUser.uid?currentUser.photoURL:data.user.photoURL}
            alt=""
          />
          <span className="chatMessageTime">{messageTime}</span>
        </div>

        <div className="chatMesagedata">
          <span className="chatMessageText">{message.text}</span>
          {message.img && <img src={message.img} alt="" srcset="" />}
          
        </div>

    </div>

  );
};

export default ChatMessage;
