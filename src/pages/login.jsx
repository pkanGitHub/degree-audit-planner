import React, {useState} from 'react';
import "../styles/formStyle.css";
import Cookies from 'universal-cookie';
import CookiePopup from '../components/cookiepopup';
import { API } from 'aws-amplify';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [errorMsg, setErrorMsg] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
    

        API.post('DatabaseAPI', "/auth/login", { body: formData })
        .then(response => {
            console.log('Login successful on the frontend')
            cookies.set("user", {id: response.id}, {expires: tomorrow}) // takes data and adds it to cookie
            // Redirect
            window.location.href = '/audit'
        })
        .catch(error => {
            setErrorMsg(error.response.data.message)
            console.log('Login failed on the frontend:', error.response.data.message)
        })
    }
    
      const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        setErrorMsg(null)
      }

  
    // grabs today's date and then sets the date to tomorrow, used for cookie expiry
    var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);


    const cookies = new Cookies(null);

    // this is a test to see how information from that works, DELETE WHEN COMPLETED
    cookies.set("user2", {email: "test", password: "password", testCategories: [{type: "majors", category: "BS in Information Technology"}, {type: "majors", category: "BS in Information Technology"}]}, {expires: tomorrow})

    return (
        <div className="formSection">
            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
  
            <p></p>
            <div id="formDesign">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div id="formContent">
                        <label >Email</label>          
                        <input type="text" name="email" placeholder="Enter email here..." value={formData.email} onChange={handleChange}/>
                        <br/>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Enter password here..." value={formData.password} onChange={handleChange}/>
        
                        <a href="/forgotpassword">Forgot Password?</a>
                    </div>
                    
                    <br/>
                    <button type="submit" className="submitButton">Login</button>
                    <br/>
                    <a href="/signup">Don't have an account? Sign up here!</a>

                </form>
            </div>

            <CookiePopup />
        </div>
    )
}

export default Login