import { signOut } from 'firebase/auth'
import '../style.scss'
import { auth } from '../firebase'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const {currentUser}=useContext(AuthContext);

  return (
    <div className='navbar'>
        <span className="logo">Own Chat</span>
        <div className="owenerinfo">
            <img src={currentUser.photoURL} alt="" srcset="" />
            <span>{currentUser.displayName}</span>
            <button onClick={()=>{signOut(auth)}}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar