import { Routes, Route } from 'react-router-dom';
import Home from "./pages/home"
import Audit from "./pages/audit"
import ForgotPassword from "./pages/forgotPassword"
import Login from "./pages/login"
import SignUp from "./pages/signUp"
import Tutorial from "./pages/tutorial"
import UserProfile from "./pages/userProfile"

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="audit" element={<Audit />}/>
      <Route path="forgotpassword" element={<ForgotPassword />}/>
      <Route path="login" element={<Login />}/>
      <Route path="signup" element={<SignUp />}/>
      <Route path="tutorial" element={<Tutorial />}/>
      <Route path="userProfile" element={<UserProfile />}/>
    </Routes>
  );
}

export default App;
