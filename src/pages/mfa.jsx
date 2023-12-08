import "../styles/formStyle.css"

import React, { useState } from 'react'
import { API } from 'aws-amplify';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

const MFA = () => {
    const [verificationCode, setVerificationCode] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [code, setCode] = useState({border: "1px solid black"})

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
                setCode({border: "1px solid black"})
                cookies.set("user", {id: response.id}, {expires: tomorrow}) // takes data and adds it to cookie
                navigate('/login');

            } else {
                console.log(response);
                if (response.data.error === 'invalid_code') {
                    setErrorMsg('Invalid verification code. Please try again.');
                    setCode({border: "1px solid red"})
                } else {
                    // Display a generic error message for other errors
                    setErrorMsg('Failed to verify email. Please try again.');
                    setCode({border: "1px solid red"})
                }
            }
        } catch (error) {
            console.error(error)
            setErrorMsg('Failed to verify email. Please try again.')
            setCode({border: "1px solid red"})
        }
    }

    return(
        <div className="formSection">
            <div id="formDesign" className="mfa">
                <h1>2-Step Verification</h1>
                <p id="pleaseConfirm">Please confirm this is you. We sent a verification code to your email.</p>
                {errorMsg && <p id='errorMessage'>{errorMsg}</p>}
                <form>
                    <div id="formContent">
                        <label htmlFor="code">Enter Code</label>
                        <input type="text" name="code" value={verificationCode} style={code} onChange={(e) => setVerificationCode(e.target.value)} />
                        <button id = "verifyEmailButton" onClick={handleVerification}>Verify Email</button>
                    </div>
                    <br/>
                </form>
            </div>
        </div>
    )
}

export default MFA;