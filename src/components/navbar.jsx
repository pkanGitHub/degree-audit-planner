import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const NavBar = () => {
    return (
    <nav>
      <ul>
         <li className='title'>
            <Link to="/">Mizzou Engineering Degree Audit</Link>
         </li>
        
         <li>
            <Link to="/">User Profile Pic</Link>
         </li>
         <li>
            <Link to="/signup">Sign Up</Link>
         </li>
         <li>
            <Link to="/login">Login</Link>
         </li>
         <li>
            <Link to="/">Home</Link>
         </li>

      </ul>
    </nav>
    );
   };
   
   export default NavBar;