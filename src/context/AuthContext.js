import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../firebase.js';
export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{

    const [currentUser,setCurrentUser] = useState(null);

    useEffect(()=>{
        const clfn = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
          });

          return ()=>{
            clfn();
          }

    },[])
    

      return (<AuthContext.Provider value={{currentUser}}>
        {children}
      </AuthContext.Provider>);

}