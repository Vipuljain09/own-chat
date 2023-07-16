import '../style.scss'
import paper from '../image/paperclip.png'
import pic from '../image/image.png'
import { useContext, useState } from 'react'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'
import { db,storage } from '../firebase'
import { v4 as uuid } from 'uuid';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";

import { Timestamp, arrayUnion, updateDoc,doc, serverTimestamp } from 'firebase/firestore'

import EmojiPicker from 'emoji-picker-react';
const ChatInput = () => {
  const [displayemoji,setDisplayemoji] = useState(false);
  const [text,setText] = useState("");
  const [img,setImg] = useState(null);

  const {data} = useContext(ChatContext);
  const {currentUser} = useContext(AuthContext);

  const sendHandle = async()=>{

    if(img){
      const storageRef = ref(storage, uuid());
      await uploadBytesResumable(storageRef, img).then(()=>{
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateDoc(doc(db,"chats",data.chatId),{
              messages:arrayUnion({
                id:uuid(),
                text,
                sendId:currentUser.uid,
                time:Timestamp.now(),
                img:downloadURL
              })
            })
          } catch (err) {
            //console.log(err);
            
          }
        });
      })
    }
    else{
      await updateDoc(doc(db,"chats",data.chatId),{
        messages:arrayUnion({
          id:uuid(),
          text,
          sendId:currentUser.uid,
          time:Timestamp.now()
        })
      })
    }

    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId+".lastmessage"]:{
        text
      },
      [data.chatId+".time"]:serverTimestamp()
    })
    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId+".lastmessage"]:{
        text
      },
      [data.chatId+".time"]:serverTimestamp()
    })
    
    setImg(null);
    setText("");
    
  }

  const onemojiClick = (emojiObject)=>{
    //console.log(emojiObject);
    setText((pre)=>pre+emojiObject.emoji);
    //console.log(text);
  }
  
  return (
    <div className='chatInput'>
      <input type="text" name="" id="" placeholder='Type Something...' onChange={(e)=>{setText(e.target.value)}} value={text}/>
      <div className="send"> 
       <i className="emojiInput fa-regular fa-face-smile" onClick={()=>{
        setDisplayemoji(pre=>!pre);
       }}></i>
        <label htmlFor="fileInput" className='fileInputImg'>
          <img src={paper} alt='' srcset="" />
          <img src={pic} alt="" srcset="" /></label>
        <input type="file" name="" id="fileInput" style={{display:"none"}}
        onChange={(e)=>{setImg(e.target.files[0])}} />
        <button onClick={sendHandle}>Send</button>
      </div>
      <div className="emojiPickerInput">
      {displayemoji && <EmojiPicker Theme="dark" height="250px" width="300px" searchDisabled={true} onEmojiClick={onemojiClick} emojiStyle="google"></EmojiPicker>}
      </div>
      
    </div>
  )
}

export default ChatInput
