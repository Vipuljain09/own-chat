import '../style.scss';
import Chats from './Chats';
import Navbar from './Navbar';
import Searchbar from './Searchbar';

const Sidebar = (props) => {
  //console.log(props.className);
  return (
    <div className={`sidebar ${props.className?props.className:""}`}>
      <Navbar></Navbar>
      <Searchbar></Searchbar>
      <Chats onChangeFlg={props.onChangeFlg}></Chats>
    </div>
  )
}

export default Sidebar
