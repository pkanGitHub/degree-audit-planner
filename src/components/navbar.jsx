import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import image from "../profilephoto.png"

const NavBar = () => {
    return (
    <div className='navbar'>
      
      <Link to="/" id='title' className='navbarlink'>Mizzou Engineering Degree Audit</Link>
         
      
      <div className='rightItems'>
         
         <Link to="/" className='navbarlink'>Home</Link>
         <Link to="/login" className='navbarlink'>Login</Link>
         <Link to="/signup" className='navbarlink'>Sign Up</Link>
         <div id='imagespace'>
            <img src={image} alt='profilephoto' id='userprofile'></img>
         </div>


      </div>
    
    </div>
    );
   };
   
   export default NavBar;