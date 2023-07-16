import { useContext, useEffect, useState } from 'react'
import '../style.scss'
import { AuthContext } from '../context/AuthContext'
import { onSnapshot,doc } from 'firebase/firestore'
import { db } from '../firebase.js'
import { ChatContext } from '../context/ChatContext'

const Chats = (props) => {
  const {currentUser} = useContext(AuthContext);
  const [chats,setChats] = useState([]);
  const {dispatch} = useContext(ChatContext);
  useEffect(()=>{
    
    const setchatState=()=>{
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
          setChats(doc.data()); 
          //console.log(Object.entries(chats),currentUser.uid);
      });

      return ()=>{
        unsub();
      }
    }
    
    currentUser && setchatState();
    
  },[currentUser]);

  const selectHandler = (user)=>{
    props.onChangeFlg();
    dispatch({
      type:"USER_CHANGED",
      payload:user
    })
  }

  return (

    <div className='chats'>
      {chats && Object.entries(chats)?.sort((a,b)=>b[1].time-a[1].time).map((chat)=>{
        //console.log(chat);
        return (<div className="chatsItem" key={chat[0]} onClick={()=>{
          selectHandler(chat[1].userInfo)
        }}>
          <img src={chat[1].userInfo.photoURL} alt="" srcset="" />
          <div className="chatItemInfo">
            <span className='chatName'>{chat[1].userInfo.displayName}</span>
            <p className='chatText'>{chat[1].lastmessage?.text}</p>
          </div>
        </div>)

      })}

      
    </div>
  )
}

export default Chats
