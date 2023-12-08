import React, {useState} from 'react';
import "../styles/formStyle.css";
import Cookies from 'universal-cookie';
import CookiePopup from '../components/cookiepopup';
import { API } from 'aws-amplify';
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [errorMsg, setErrorMsg] = useState(null)

    const navigate = useNavigate();
    const [passwordBorder, setPasswordBorder] = useState({border: "1px solid black"})
    const [emailBorder, setEmail] = useState({border: "1px solid black"})


    const cookies = new Cookies(null);
    if (cookies.get("user")?.id) navigate('/audit');

    const handleSubmit = async (e) => {
        e.preventDefault()
        const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        if(!formData.email || !isValidEmail(formData.email)){
          setEmail({border: "1px solid red"})
          setPasswordBorder({border: "1px solid black"})
          setErrorMsg("You must enter an email.")
          return
        }
        else if(!formData.password){
          setEmail({border: "1px solid black"})
          setPasswordBorder({border: "1px solid red"})
          setErrorMsg("You must enter a password.")
          return
        }
    

        API.post('DatabaseAPI', "/auth/login", { body: formData })
        .then(response => {
            console.log('Login successful on the frontend')
            cookies.set("email", {email: formData.email}, {expires: tomorrow}) // takes data and adds it to cookie
            console.log(response.message)
            navigate('/loginMFA');
        })
        .catch(error => {
            setEmail({border: "1px solid red"})
            setPasswordBorder({border: "1px solid red"})
            setErrorMsg(error.response.data.message)
            console.log('Login failed on the frontend:', error.response.data.message)
        })
    }
    
      const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        setErrorMsg(null)
      }

      const isValidEmail = (email) => {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
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
                          <div id = "forgotPasswordContainer">
                            <a href="/forgotpassword">Forgot Password?</a>
                          </div>
                    </div>
                    
                    <br/>
                    <button type="submit" className="submitButton">Login</button>
                    <br/>
                    <div id="signupContainer">
                      <a href="/signup">Don't have an account? Sign up here!</a>
                    </div>
                </form>
            </div>

            <CookiePopup />
        </div>
    )
}

export default Login