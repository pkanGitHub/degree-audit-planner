import "../styles/password.css"
import image from "../password.png"
import Cookies from "universal-cookie";
import { useState } from "react";

const ForgotPassword = () => {
    const cookies = new Cookies(null);
    // grabs today's date and then sets the date to tomorrow, used for cookie expiry
    var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    const [formData, setFormData] = useState("")
    const [errorMsg, setErrorMsg] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!formData)
        {
            setErrorMsg("You must enter an email.")
        }
        else{
            window.location.href = '/passwordMFA'
        }
    
        // try {
        //     const response = await fetch('http://localhost:4001/email', {
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //       body: JSON.stringify(formData),
        //     })
        
        //     const data = await response.json()
        
        //     if (response.ok) {
        //         console.log('Email exists')
        //         cookies.set("forgotpass", formData, {expires: tomorrow}) // takes data and adds it to cookie
        //         // Redirect
        //         window.location.href = '/passwordMFA'
        //     } else {
        //         // show error message on browser or console...
        //         setErrorMsg(data.message)
        //         console.log('Login failed on the frontend:', data.message)
        //     }
        //   } catch (error) {
        //     console.error('Error during login on the frontend:', error)
        // }
    }

    const handleChange = (e) => {
        setFormData(e.target.value)
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
                    
                    <input type="text" placeholder="Enter email address here..." value={formData} onChange={handleChange}/>
                    <br/>
                    {/* this does not exactly make sense, will need to figure out how to route these */}
                    <button type="submit" id="forgotNextButton">Next</button>

                </form>
            </div>
        </div>
    )
};

export default ForgotPassword;