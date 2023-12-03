import { useState } from "react"
import Cookies from "universal-cookie";
import axios from "axios";

const PasswordMFA = () => {
    const cookies = new Cookies(null);

    let testAuth = null;
    try{
        testAuth = cookies.get("forgotpass")
        if(testAuth === undefined){
            testAuth = "";
        }
    }
    catch(err){
        console.log(err)
    }

    const [error, setError] = useState("")
    const [verificationCode, setVerificationCode] = useState('')
    const [verificationRequestInProgress, setVerificationRequestInProgress] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!verificationCode)
        {
            setError("You must enter a code.")
        }
        else{
            window.location.href = '/resetpassword'
        }
    
        
    }

    const handleChange = (e) => {
        setVerificationCode(e.target.value)
        setError("")
      }

    // this was just me testing out stuff
    const handleVerification = async () => {
        try {
            setVerificationRequestInProgress(true);
            const response = await axios.post('http://localhost:4001/verify-user', { verificationCode })
            if (response.data.success) {
                console.log(response.data.message)
                // window.location.href = '/audit'
            } else {
                setError(response.data.message)
                console.log(response.data.message || 'Invalid verification code. Please try again.')
            }
        } catch (error) {
            console.error(error)
            console.log('Failed to verify email. Please try again.')
        } finally {
            setVerificationRequestInProgress(false);
        }
    }

    return(
        <div className="formSection">
            <div id="formDesign" className="mfa">
                <form onSubmit={handleSubmit}>
                    <h1>2-Step Verification</h1>
                    <h2>{testAuth}</h2>
                    <h2>Please confirm this is you. We sent a verification code to your email.</h2>
                    <p id="errorMessage">{error}</p>
                    <div id="formContent">
                        <label htmlFor="code">Enter Code</label>
                        <input type="text" name="code" value={verificationCode} onChange={handleChange} />
                        <div id="mfaButtons">
                            <a href="/forgotpassword" id="mfaBack">Cancel</a>
                            <button type="submit" id="mfaSubmit">Reset Password</button>
                        </div>
                        
                        {/* <button className="submitButton" id="mfabutton" onClick={handleVerification} disabled={verificationRequestInProgress}>
                            {verificationRequestInProgress ? 'Verifying...' : 'Verify Email'}
                        </button> */}
                    </div>
                    <br/>
                </form>
            </div>
        </div>
    )
    



}
export default PasswordMFA