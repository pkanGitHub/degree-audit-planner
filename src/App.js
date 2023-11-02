import { Routes, Route } from 'react-router-dom';
import Home from "./pages/home"
import Audit from "./pages/audit"
import ForgotPassword from "./pages/forgotPassword"
import Login from "./pages/login"
import SignUp from "./pages/signUp"
import Tutorial from "./pages/tutorial"
import NavBar from "./components/navbar"
import ResetPassword from './pages/resetPassword';
import MFA from './pages/mfa';

import './styles/App.css';


// to run app, type: npm run start
// if this is first time, have to download dependencies so run npm install

function App() {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="audit" element={<Audit />}/>
      <Route path="forgotpassword" element={<ForgotPassword />}/>
      <Route path="login" element={<Login />}/>
      <Route path="signup" element={<SignUp />}/>
      <Route path="tutorial" element={<Tutorial />}/>
      <Route path="resetpassword" element={<ResetPassword />}/>
      <Route path="mfa" element={<MFA/>}/>
    </Routes>
    </>
  );
}

export default App;
