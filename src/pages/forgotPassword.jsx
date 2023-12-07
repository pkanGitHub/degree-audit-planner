import "../styles/password.css"
import Cookies from "universal-cookie";
import { useState } from "react";

const ForgotPassword = () => {
    const cookies = new Cookies(null);
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
        
    
        try {
            const response = await fetch('http://localhost:4001/email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            })
        
            const data = await response.json()
        
            if (response.ok) {
                console.log('Email exists')
                cookies.set("forgotpass", {email: formData.email}, {expires: tomorrow}) // takes data and adds it to cookie
                // Redirect
                window.location.href = '/passwordMFA'
            } else {
                // show error message on browser or console...
                setErrorMsg(data.msg)
                console.log('Login failed on the frontend:', data.msg)
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
        <div id="forgotPassword">
            <div id="forgotPasswordForm">
                <form id="passwordForm" onSubmit={handleSubmit}>
                    <h1>Forgot Password?</h1>
                    <p id="enterEmail">Enter the email address associated with your account.</p>
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