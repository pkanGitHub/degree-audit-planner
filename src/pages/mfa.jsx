import "../styles/formStyle.css"

import React, { useState } from 'react'
import axios from 'axios'
import { API } from 'aws-amplify';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

const MFA = () => {
    const [verificationCode, setVerificationCode] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const navigate = useNavigate();
    const cookies = new Cookies(null);
    if (cookies.get("user")?.id) navigate('/audit');

    const handleVerification = async (e) => {
        e.preventDefault()

        const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

        try {
            const response = await API.post('DatabaseAPI', "/auth/verify-email", { body: { verificationCode: verificationCode }})
            console.log('Server Response:', response);
            if (response.success) {
                console.log('Email verification successful!')
                cookies.set("user", {id: response.id}, {expires: tomorrow}) // takes data and adds it to cookie
                navigate('/');

            } else {
                console.log(response);
                if (response.data.error === 'invalid_code') {
                    setErrorMsg('Invalid verification code. Please try again.');
                } else {
                    // Display a generic error message for other errors
                    setErrorMsg('Failed to verify email. Please try again.');
                }
            }
        } catch (error) {
            console.error(error)
            setErrorMsg('Failed to verify email. Please try again.')
        }
    }

    return(
        <div className="formSection">
            <div id="formDesign" className="mfa">
                <h1>2-Step Verification</h1>
                <h2>Please confirm this is you. We sent a verification code to your email.</h2>
                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                <form>
                    <div id="formContent">
                        <label htmlFor="code">Enter Code</label>
                        <input type="text" name="code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
                        <button onClick={handleVerification}>Verify Email</button>
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

export default MFA;