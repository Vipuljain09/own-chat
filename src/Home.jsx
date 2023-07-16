import "./style.scss";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { useState } from "react";
const Home = () => {
  const [isflag,setIsflag] = useState(false);
  //console.log(isflag);
  const onChangeFlg=()=>{
    setIsflag(!isflag);
  }
  return (
    <div className="home">
      <div className="homeWrapper">
        <Sidebar onChangeFlg={onChangeFlg} className={isflag && "sidebarExtra"}></Sidebar>
        <Chat onChangeFlg={onChangeFlg} className={isflag && "chatExtra"}></Chat>
      </div>
    </div>
  );
};

export default Home;
