import "../styles/password.css"
import image from "../password.png"
import Cookies from "universal-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from 'aws-amplify';

const ForgotPassword = () => {
    const cookies = new Cookies(null);
    const navigate = useNavigate();
    // grabs today's date and then sets the date to tomorrow, used for cookie expiry
    var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    const [formData, setFormData] = useState({ email: '' })
    const [errorMsg, setErrorMsg] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!formData.email)
        {
            setErrorMsg("You must enter an email.")
            return
        }
        
    
        API.post('DatabaseAPI', "/auth/email", { body: formData })
        .then(response => {
            console.log('Email exists')
            cookies.set("forgotpass", {email: formData.email}, {expires: tomorrow}) // takes data and adds it to cookie
            navigate('/passwordMFA');
        })
        .catch(error => {
            setErrorMsg(error.response.data.msg)
            console.log('Login failed on the frontend:', error.response.data.msg)
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        setErrorMsg(null)
      }
    return (
        <div id="forgotPassword">
            <div id="forgotPasswordForm">
                <div id="imageDiv">

                    <img src={image} alt="testimage"></img>
                </div>
                
                <form id="passwordForm" onSubmit={handleSubmit}>
                    <h1>Forgot Password?</h1>
                    <h2>Enter the email address associated with your account.</h2>
                    <p id="errorMessage">{errorMsg}</p>
                    
                    <input type="text" placeholder="Enter email address here..." name="email" value={formData.email} onChange={handleChange}/>
                    <br/>
                    {/* this does not exactly make sense, will need to figure out how to route these */}
                    <button type="submit" id="forgotNextButton">Next</button>

                </form>
            </div>
        </div>
    )
};

export default ForgotPassword;