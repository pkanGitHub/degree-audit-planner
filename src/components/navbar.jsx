import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import '../styles/navbar.css';
import image from "../profilephoto.png";
import { Link } from 'react-router-dom';
import mizzouLogo from "../MU-StackedMU-4C.png";
import { EyeInvisibleOutlined, EyeOutlined, CloseOutlined } from "@ant-design/icons";

// import can delete later
import "../styles/audit.css";
import CatalogItems from "../components/catalog";
import GenEdsModel from "../components/genEds";
import ExtraCourses from "../components/extraCourses";
import TransferCourse from "../components/transferCourses";
import SemesterPlan from "../components/semesterplan";
import { getCerts, getCourseList, getGenEds, getMajors, getMinors } from "../lib/data";
import TranscriptUpload from "../components/transcriptUpload";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Cookies from "universal-cookie";


const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSignOut = () => {
    window.location.href = '/'
    cookies.remove("user")
  }

  


  // this is testing for user information, may want to use this to query data, can do this in use effect!


  const cookies = new Cookies(null);


  let testAuth = null;
    try{
        testAuth = cookies.get("user")
        if(testAuth === undefined){
            testAuth = ""
        }
    }
    catch(err){
        console.log(err)
    }
  

  useEffect(()=> {
    try{
      testAuth = cookies.get("user")
      // checks if has cookie, if does, does not render login and sign up, else does render login and sign up
      if(testAuth?.id){
        setShowLogin(false)
      }
      else{
        setShowLogin(true)
        testAuth = ""
      }
    }catch(err){
      console.log(err)
    }
  }, [])

  

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
        window.location.href = '/login';
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

        {showLogin ? <Link to="/login" className='navbarlink'>Login</Link> : null}
        {showLogin ? <Link to="/signup" className='navbarlink'>Sign Up</Link> : null}
        {showLogin ? null : <Link to="/" className='navbarlink' onClick={handleSignOut}>Sign Out</Link>}

        {showLogin ? null : <Popup
            contentStyle={{ borderRadius: '3px', width: '40%', height: '50%' }}
            trigger={<button id='pfpButton' onClick={() => handleButtonClick()}><img src={image} alt='profilephoto' id='userprofile' /></button>}
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
              
                  <form onSubmit={handleSubmit}>
                    
                      <label>Email
                        <div id="formContent">
                          <input className="userInfo"
                            value={testAuth.email}
                            type="text"
                            placeholder={testAuth.email}
                            readOnly={true}
                          />
                          </div>
                      </label>
                      
                      <br/>

                      <label>Password
                        <div className="password-input" id="formContent">
                          <input className="userInfo"
                            value={testAuth.password}
                            type={visible ? "text" : "password"}
                            readOnly={true}
                          />
                          <div className="eye-icon" onClick={() => setVisible(!visible)}>
                            {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </div>
                        </div>
                      </label>

                      <br/>
                    <button className="editButton" type="submit">Reset Password</button>

                  </form>
                </div>
            )}
          </Popup>}
          
        </div>
      </div>
  );
};

export default NavBar;
