import { useContext } from "react";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import { BrowserRouter,Navigate,Route,Routes} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
function App() {
  
  const {currentUser} = useContext(AuthContext);
  //console.log(!currentUser);
  
  const ProtectedRoute = ({children})=>{
    if(!currentUser){
      return <Navigate to='/login'></Navigate>
    }
    return children;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
