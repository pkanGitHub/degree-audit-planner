import "../styles/formStyle.css"

import React, { useState } from 'react'
import axios from 'axios'

const MFA = () => {
    const [verificationCode, setVerificationCode] = useState('')

    const handleVerification = async () => {
        try {
            const response = await axios.post('http://localhost:4001/verify-email', { verificationCode })
    
            if (response.data.success) {
                console.log('Email verification successful!')
                window.location.href = '/audit'

            } else {
                console.log('Invalid verification code or code has expired. Please try again.')
            }
        } catch (error) {
            console.error(error)
            console.log('Failed to verify email. Please try again.')
        }
    }

    return(
        <div className="formSection">
            <div id="formDesign" className="mfa">
                <h1>2-Step Verification</h1>
                <h2>Please confirm this is you. We sent a verification code to your email.</h2>
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