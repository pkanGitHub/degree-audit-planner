import React, { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import '../styles/navbar.css';
import image from "../profilephoto.png";
import { Link } from 'react-router-dom';
import mizzouLogo from "../MU-StackedMU-4C.png";

const NavBar = () => {
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
        <Link to="/login" className='navbarlink'>Login</Link>
        <Link to="/signup" className='navbarlink'>Sign Up</Link>
          <Popup
            contentStyle={{ borderRadius: '3px', width: '40%', height: '80%' }}
            trigger={<button id='pfpButton' onClick={() => handleButtonClick()}><img src={image} alt='profilephoto' id='userprofile' /></button>}
            modal nested
          >
            {(close) => (
              <div className="profileSection">
                <div id="profileDesign">
                  <h1>Create Your Account</h1>
                  <form onSubmit={handleSubmit}>
                    <div id="profileContent">
                      <label>Email
                        <input type="text" name="email" placeholder="user email" value={formData.email} onChange={handleChange}/>
                      </label>
                      <br/>
                      <label>Password
                        <input type="text" name="password" placeholder="current password" value={formData.password} onChange={handleChange}/>
                      </label>
                      <br/>
                      <label>Enter Password Again
                        <input type="text" name="confirmPassword" placeholder="enter new password" value={formData.confirmPassword} onChange={handleChange}/>
                      </label>
                    </div>
                    <button className="submitButton" type="submit">Save Changes</button>
                  </form>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
  );
};

export default NavBar;
