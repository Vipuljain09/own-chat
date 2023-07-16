import { createContext, useContext,  useReducer } from "react";
import { AuthContext } from "./AuthContext.js";
export const ChatContext = createContext();

export const ChatContextProvider = ({children})=>{

    const {currentUser} = useContext(AuthContext);

    const INITIAL_STATE = {
        chatId:"null",
        user:{   
        }
    }

    const chatReducer = (state,action)=>{
        switch (action.type) {
            case "USER_CHANGED":
                return {
                    chatId:
                    currentUser.uid>action.payload.uid?
                    currentUser.uid+action.payload.uid:
                    action.payload.uid+currentUser.uid,

                    user:action.payload,     
                }
                break;
            default:
                return state;
                break;
        }
    }

    const [state,dispatch]= useReducer(chatReducer,INITIAL_STATE);

    
      return (<ChatContext.Provider value={{data:state,dispatch}}>
        {children}
      </ChatContext.Provider>);

}