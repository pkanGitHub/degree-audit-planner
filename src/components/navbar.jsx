import React, { useEffect } from 'react';
import Popup from 'reactjs-popup';
import '../styles/navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import mizzouLogo from "../MU-StackedMU-4C.png";
import { CloseOutlined } from "@ant-design/icons";

// import can delete later
import "../styles/audit.css";
import 'react-confirm-alert/src/react-confirm-alert.css';
import Cookies from "universal-cookie";
import { read } from "../lib/user"


const NavBar = () => {
  const cookies = new Cookies(null);
  const user = cookies.get("user")
  const loggedIn = Boolean(user?.id);
  const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) read(user?.id);
    })
  
    const handleSignOut = () => {
        navigate('/');
        cookies.remove("user")
    }


  return (
    <div className='navbar'>
      <div className='leftItems'>
         <img src={mizzouLogo} alt='mizzouLogo' id='mizLogo'></img>
         <Link to="/" id='universityTitle'>University of Missouri</Link>
      </div>

      <div className='rightItems'>
        <Link to="/" className='navbarlink'>Home</Link>
        <Link to="/audit" className='navbarLink'>Audit</Link>
        {!loggedIn ? <Link to="/login" className='navbarlink'>Login</Link> : null}
        {!loggedIn ? <Link to="/signup" className='navbarlink'>Sign Up</Link> : null}
        {!loggedIn ? null : <Link to="/" className='navbarlink' onClick={handleSignOut}>Sign Out</Link>}

        {!loggedIn ? null : <Popup
            contentStyle={{ borderRadius: '0px', width: '40%', height: '40%' }}
            trigger={<button className="navbarlink" >Profile</button>}
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
                            <p>{user.email}</p>
                          </div>
                      </label>
                      
                      <br/>

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
