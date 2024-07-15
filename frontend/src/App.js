import { Route,Routes } from "react-router-dom";
import Login from "./pages/Login";
import Sginup from "./pages/Sginup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Editprofile from "./pages/Editprofile";
import ChangePassword from "./pages/ChangePassword";
import EmailVerfication from "./pages/EmailVerfication";

function App() {
  return (
    <div className="App">
      
      <Routes>
      <Route element={<Home/>} exact path="/"> </Route>
        <Route element={<Login/>} path="/login"> </Route>
        <Route element={<Sginup/>} path="/signup"> </Route>
        <Route element={<Profile/>} path="/profile"></Route>
        <Route element={<Editprofile/>} path="/edit"></Route>
        <Route element={<ChangePassword/>} path="/changepswd"></Route>
        <Route element={<EmailVerfication/>} path="/emailverify"></Route>
        

      </Routes>
    
    </div>
  );
}

export default App;
