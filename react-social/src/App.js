import Home from "./pages/Home/Home";
import Profile from "./pages/profile/Profile";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Messenger from "./pages/Messenger/Messenger";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


function App() {
  const {user} = useContext(AuthContext);


  return (
    <Router>
      <Routes>
        <Route path="/" element = {user? <Home/>: <Register/>}/>
        <Route path="/login" element={user?<Navigate to="/"/>:<Login/>}/>
        <Route path="/register" element={user?<Navigate to="/"/>:<Register/>}/>
        <Route path="/messenger" element={user?<Messenger/>:<Register/>}/>
        <Route path="/profile/:username" element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
