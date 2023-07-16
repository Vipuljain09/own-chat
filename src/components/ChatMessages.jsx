import React, { useContext, useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { ChatContext } from '../context/ChatContext';

import { doc, onSnapshot } from 'firebase/firestore';
import {  db } from '../firebase.js';
const ChatMessages = () => {
  const [messages,setMessages] = useState([]);
  const {data} = useContext(ChatContext);
  
  useEffect(()=>{
    const unsub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
      doc.exists() && setMessages(doc.data().messages);
     // console.log(messages);
    })
    return ()=>{
      unsub();
    }
  },[data.chatId]);

  return (
    <div className='chatmessages'>
      {messages.length > 0 && messages.map(m=>{

        return <ChatMessage message={m} key={m.id}></ChatMessage>

      })}
      
    </div>
  )
}

export default ChatMessages
