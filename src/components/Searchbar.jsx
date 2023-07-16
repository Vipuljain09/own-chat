import React, { useContext, useState } from 'react';
import { collection, query, where ,getDocs,doc,getDoc,setDoc,updateDoc, serverTimestamp} from "firebase/firestore";
import { db } from '../firebase.js';
import { AuthContext } from '../context/AuthContext.js';
const Searchbar = () => {

  const {currentUser} = useContext(AuthContext);

  const [username,setUsername] = useState("");
  const [user,setUser] = useState(null);
  const [err,setErr] = useState(false);

  const handlerSearch = async()=>{

    const q = query(collection(db,"users"), where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        // console.log(user);
      });
    } catch (error) {
      setErr(true);
    }
    

  }

  const addUserHandler = async()=>{

    // first check there is entity in chats for pair or not ,if not create
    // second create entity in the userchat for current pair
    
    const comnbinedId = (currentUser.uid>user.uid?currentUser.uid+user.uid:user.uid+currentUser.uid);
    console.log(comnbinedId);
    console.log(currentUser.uid);
    try {
      const docRef = doc(db, "chats", comnbinedId);
      const res = await getDoc(docRef);

      if(!res.exists()){

        await setDoc(doc(db, "chats", comnbinedId), {
          messages:[]
        });

        
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [comnbinedId+".userInfo"]:{
            uid:user.uid,
            photoURL:user.photoURL,
            displayName:user.displayName
          },
          [comnbinedId+".time"]:serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [comnbinedId+".userInfo"]:{ 
            uid:currentUser.uid,
            photoURL:currentUser.photoURL,
            displayName:currentUser.displayName
          },
          [comnbinedId+".time"]:serverTimestamp()
        });

      }

    } catch (error) {
      setErr(true);
      console.log(error);
    }
    
    setUser(null);
    setUsername("");
  }

  return (
    <div className="searchBarWrapper">

    <div className='seachbar'>
      <input type="text" name="" placeholder='Find a user' onChange={(e)=>setUsername(e.target.value)} onKeyDown={handlerSearch}
      value={username}/>
    </div>
    {err && <div>No user Found!!</div>}
    {user &&
      <div className="userChat" onClick={addUserHandler}>
        <img src={user.photoURL} alt="" srcset="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
          {/* <span>{user.uid}</span> */}
        </div> 
      </div>
    }
    
    <hr />
    </div>
  )
}

export default Searchbar




// skeleton of userchat
// userchat:{
//   currentUserId:{
//     combinedId:{
//       frienduserinfo:{
//         userId,photoURL,username
//       },
//       time:{}
//       ,
//       lastMessage:""
    
//     }
//   }
// }