import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import '../styles/navbar.css';
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
  // const [password, setPassword] = useState("");
  // const [visible, setVisible] = useState(false);

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

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleButtonClick = () => {
    // Your logic for handling the button click
    window.location.href = '/resetpassword'
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
            contentStyle={{ borderRadius: '0px', width: '40%', height: '40%' }}
            trigger={<Link to="/" className="navbarlink" onClick={() => handleButtonClick()}>Profile</Link>}
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
                            value={testAuth.email}
                            type="text"
                            placeholder={testAuth.email}
                            readOnly={true}
                          />
                          </div>
                      </label>
                      
                      <br/>

               
                      <br/>
                    <button className="editButton"  onClick={handleButtonClick}>Reset Password</button>

               
                </div>
            )}
          </Popup>}
          
        </div>
      </div>
  );
};

export default NavBar;
