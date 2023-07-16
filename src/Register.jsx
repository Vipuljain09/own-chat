import "./style.scss";
import { auth ,storage,db} from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Register = () => {
  const navigate = useNavigate();
  const [err,setErr] = useState(false);
  const handlerSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    //console.log(username, email, password, file);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user);

      const storageRef = ref(storage, displayName);

      await uploadBytesResumable(storageRef, file).then(()=>{
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {

            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            console.log(res.user);

            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");

            setErr(false);
          } catch (err) {
            //console.log(err);
            
          }
        });
      })

    } catch (error) {
      console.log("error :  ",error.message);
      setErr(true);
      //console.log(error);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Own Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handlerSubmit}>
          <input type="text" name="" placeholder="username" />
          <input type="email" name=""  placeholder="email" />
          <input type="password" name=""  placeholder="password" />
          <input
            style={{ display: "none" }}
            type="file"
            name=""
            id="fileInput"
          />
          <label htmlFor="fileInput">
            <i className="fileInputIcon fas fa-user-plus"></i>
            add an avatar
          </label>
          <button>Sign Up</button>
          {err && <p style={{color:"red"}}>Something went wrong, try again.</p>}
        </form>
        <p>Do you have a account? <Link to='/login'>Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
