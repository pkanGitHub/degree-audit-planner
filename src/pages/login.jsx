import React, {useState} from 'react';
import "../styles/formStyle.css";
// import Cookies from 'universal-cookie';
import CookiePopup from '../components/cookiepopup';
import { API } from 'aws-amplify';
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [errorMsg, setErrorMsg] = useState(null)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
    

        API.post('DatabaseAPI', "/auth/login", { body: formData })
        .then(response => {
            console.log('Login successful on the frontend')
            console.log(response)
            navigate('/loginMFA');
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

    return (
        <div className="formSection">
  
            <p></p>
            <div id="formDesign">
                <h1>Login</h1>
                <p id='errorMessage'>{errorMsg}</p>
                <form onSubmit={handleSubmit}>
                    <div id="formContent">
                        <label>Email</label>          
                        <input type="text" name="email" placeholder="Enter email here..." value={formData.email} onChange={handleChange}/>
                        <br/>
                        <label>Password</label>
                            <div className="password-input">
                              <input
                                type={visible ? "text" : "password"}
                                name="password"
                                placeholder="Enter password here..."
                                value={formData.password}
                                onChange={handleChange}
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