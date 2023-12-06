import "../styles/formStyle.css"

import React, { useState } from 'react'
import { API } from 'aws-amplify';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

const LoginMFA = () => {
    const [loginVerificationCode, setLoginVerificationCode] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

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
                navigate('/audit');
            })
            .catch(error => {
                console.log(error);
                setErrorMsg('Invalid verification code. Please try again.');
            })
        } catch (error) {
            console.error(error)
            setErrorMsg('Failed to verify user. Please try again.')
        }
    }

    return(
        <div className="formSection">
            <div id="formDesign" className="mfa">
                <h1>2-Step Verification</h1>
                <h2>We sent a verification code to your email. Please enter the code from your email here to confirm this is you.</h2>
                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                <form>
                    <div id="formContent">
                        <label htmlFor="code">Enter Code</label>
                        <input type="text" name="code" value={loginVerificationCode} onChange={(e) => setLoginVerificationCode(e.target.value)} />
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