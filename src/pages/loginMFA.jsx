import "../styles/formStyle.css"

import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';

const LoginMFA = () => {
    const [loginVerificationCode, setLoginVerificationCode] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const cookies = new Cookies(null);
    if (cookies.get("user")?.id) window.location.href = '/audit';
    const userEmail = cookies.get("email")?.email

    const handleVerification = async (e) => {
        e.preventDefault()

        const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

        try {
            const response = await axios.post('http://localhost:4001/verify-login', { loginVerificationCode })
            console.log('Server Response:', response);
            if (response.data.success) {
                console.log('Login verification successful!')
                cookies.set("user", {id: response.data.id, email: userEmail}, {expires: tomorrow}) // takes data and adds it to cookie
                cookies.remove("email")
                window.location.href = '/audit'

            } else {
                if (response.data.error === 'invalid_code') {
                    setErrorMsg('Invalid verification code. Please try again.');
                } else {
                    // Display a generic error message for other errors
                    setErrorMsg('Failed to verify user. Please try again.');
                }
            }
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