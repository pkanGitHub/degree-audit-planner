import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import '../styles/navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import mizzouLogo from "../MU-StackedMU-4C.png";
import { EyeInvisibleOutlined, EyeOutlined, CloseOutlined } from "@ant-design/icons";

// import can delete later
import "../styles/audit.css";
import 'react-confirm-alert/src/react-confirm-alert.css';
import Cookies from "universal-cookie";
import { read, userCerts } from "../lib/user"


const NavBar = () => {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);



  const cookies = new Cookies(null);
  const user = cookies.get("user")
  const loggedIn = Boolean(user?.id);
  const navigate = useNavigate();

//   let testAuth = "";
//     try{
//         testAuth = cookies.get("user")
//         if(testAuth === undefined){
//             testAuth = ""
//         }
//     }
//     catch(err){
//         console.log(err)
//     }

    useEffect(() => {
        if (loggedIn) read(user?.id);
    })
  
    const handleSignOut = () => {
        navigate('/');
        cookies.remove("user")
    }

  

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleButtonClick = () => {
    // Your logic for handling the button click
    console.log('Button clicked!');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:4001/signup', formData);

      if (response.status === 201) {
        console.log('User sign up successfully');
        navigate('/login');
      } else {
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error during sign up: ', error);
    }
  };

  return (
    <div className='navbar'>
      <div className='leftItems'>
         <img src={mizzouLogo} alt='mizzouLogo' id='mizLogo'></img>
         <Link to="/" id='universityTitle'>University of Missouri</Link>
      </div>

      <div className='rightItems'>
        <Link to="/" className='navbarlink'>Home</Link>

        {!loggedIn ? <Link to="/login" className='navbarlink'>Login</Link> : null}
        {!loggedIn ? <Link to="/signup" className='navbarlink'>Sign Up</Link> : null}
        {!loggedIn ? null : <Link to="/" className='navbarlink' onClick={handleSignOut}>Sign Out</Link>}

        {!loggedIn ? null : <Popup
            contentStyle={{ borderRadius: '0px', width: '40%', height: '50%' }}
            trigger={<Link className="navbarlink" onClick={() => handleButtonClick()}>Profile</Link>}
            modal nested
          >
            {(close) => (
              <div className="popup">

              <button
                id='close'
                onClick={() => close()}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: '#555',
                }}
              >
                <CloseOutlined />
              </button>
                      <label>Email
                        <div id="formContent">
                          <input className="userInfo"
                            value={user.email}
                            type="text"
                            placeholder={user.email}
                            readOnly={true}
                          />
                          </div>
                      </label>
                      
                      <br/>

                      {/* <label>Password
                        <div className="password-input" id="formContent">
                          <input className="userInfo"
                            value={user.password}
                            type={visible ? "text" : "password"}
                            readOnly={true}
                          />
                          <div className="eye-icon" onClick={() => setVisible(!visible)}>
                            {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </div>
                        </div>
                      </label> */}

                      <br/>
                    <Link to="/resetpassword"><button className="editButton" type="submit" onClick={() => close()}>Reset Password</button></Link>
                </div>
            )}
          </Popup>}
          
        </div>
      </div>
  );
};

export default NavBar;
