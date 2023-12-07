import React, {useState} from 'react';
import "../styles/formStyle.css";
import Cookies from 'universal-cookie';
import CookiePopup from '../components/cookiepopup';
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const Login = () => {
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [errorMsg, setErrorMsg] = useState(null)

    const [passwordBorder, setPasswordBorder] = useState({border: "2px solid lightgray"})
    const [emailBorder, setEmail] = useState({border: "2px solid lightgray"})


    const cookies = new Cookies(null);
    if (cookies.get("user")?.id) window.location.href = '/audit';

    const handleSubmit = async (e) => {
        e.preventDefault()
        const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        if(!formData.email){
          setEmail({border: "2px solid red"})
          setPasswordBorder({border: "2px solid lightgray"})
          setErrorMsg("You must enter an email.")
          return
        }
        else if(!formData.password){
          setEmail({border: "2px solid lightgray"})
          setPasswordBorder({border: "2px solid red"})
          setErrorMsg("You must enter a password.")
          return
        }
    
        try {
            const response = await fetch('http://localhost:4001/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            })
        
            const data = await response.json()
        
            if (response.ok) {
                console.log('Login successful on the frontend')
                console.log(response)
                // grabs today's date and then sets the date to tomorrow, used for cookie expiry
                cookies.set("email", {email: formData.email}, {expires: tomorrow}) // takes data and adds it to cookie
                // Redirect
                window.location.href = '/loginMFA'
            } else {
                // show error message on browser or console...
                setEmail({border: "2px solid red"})
                setPasswordBorder({border: "2px solid red"})
                setErrorMsg(data.message)
                console.log('Login failed on the frontend:', data.message)
            }
          } catch (error) {
            console.error('Error during login on the frontend:', error)
        }
    }
    
      const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        setErrorMsg(null)
      }

    return (
        <div className="formSection">
  
            <p></p>
            <div id="formDesign">
                <h1>Login</h1>
                <p id='errorMessage'>{errorMsg}</p>
                <form onSubmit={handleSubmit}>
                    <div id="formContent">
                        <label>Email</label>          
                        <input type="text" name="email" placeholder="Enter email here..." value={formData.email} onChange={handleChange} style={emailBorder}/>
                        <br/>
                        <label>Password</label>
                            <div className="password-input">
                              <input
                                type={visible ? "text" : "password"}
                                name="password"
                                placeholder="Enter password here..."
                                value={formData.password}
                                onChange={handleChange}
                                style={passwordBorder}
                              />
                              <div className="eye-icon" onClick={() => setVisible(!visible)}>
                                {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                              </div>
                            </div>
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