import "../styles/formStyle.css"

import React, { useState } from 'react'
import { API } from 'aws-amplify';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

const LoginMFA = () => {
    const [loginVerificationCode, setLoginVerificationCode] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [code, setCode] = useState({border: "1px solid black"})

    const navigate = useNavigate();
    const cookies = new Cookies(null);
    console.log("at loginMFA")
    // if (cookies.get("user")?.id) navigate('/audit');
    const userEmail = cookies.get("email")?.email
    if (!userEmail) navigate('/login');

    const handleVerification = async (e) => {
        e.preventDefault()

        const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

        try {
            API.post('DatabaseAPI', "/auth/verify-login", { body: {loginVerificationCode: loginVerificationCode} })
            .then(response => {
                console.log('Login verification successful!')
                cookies.set("user", {id: response.id, email: userEmail}, {expires: tomorrow}) // takes data and adds it to cookie
                cookies.remove("email")
                setCode({border: "1px solid black"})
                navigate('/audit');
            })
            .catch(error => {
                console.log(error);
                if (error.response.data.error === 'invalid_code') {
                    setErrorMsg('Invalid verification code. Please try again.');
                    setCode({border: "1px solid red"})
                } else {
                    // Display a generic error message for other errors
                    setErrorMsg('Failed to verify user. Please try again.');
                    setCode({border: "1px solid red"})
                }
            })
        } catch (error) {
            console.error(error)
            setErrorMsg('Failed to verify user. Please try again.')
            setCode({border: "1px solid red"})
        }
    }

    return(
        <div className="formSection">
            <div id="formDesign" className="mfa">
                <h1>2-Step Verification</h1>
                <h2>We sent a verification code to your email. Please enter the code from your email here to confirm this is you.</h2>
                {errorMsg && <p id='errorMessage'>{errorMsg}</p>}
                <form>
                    <div id="formContent">
                        <label htmlFor="code">Enter Code</label>
                        <input type="text" name="code" value={loginVerificationCode} style={code} onChange={(e) => setLoginVerificationCode(e.target.value)} />
                        <button id="mfaSubmit" onClick={handleVerification}>Verify Login</button>
                    </div>
                    <br/>
                </form>
            </div>
        </div>
    )
}
                /* <a href="/resetpassword" className="submitButton" id="mfabutton">Submit</a>
                    <br/>
                    <a href="/forgotpassword">Cancel</a> */

export default LoginMFA;