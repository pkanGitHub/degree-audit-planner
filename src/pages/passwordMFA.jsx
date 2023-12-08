import { useState } from "react"
import Cookies from "universal-cookie";
import { API } from 'aws-amplify';
import { useNavigate } from "react-router-dom";

const PasswordMFA = () => {
    const cookies = new Cookies(null);
    const navigate = useNavigate();
    const [code, setCode] = useState({border: "1px solid black"})

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

    const [errorMsg, setErrorMsg] = useState("")
    const [resetPwdVerificationCode, setResetPwdVerificationCode] = useState('')
  
    const handleVerification = async (e) => {
        e.preventDefault()
        try {
            API.post('DatabaseAPI', "/auth/verify-user", { body: {resetPwdVerificationCode: resetPwdVerificationCode} })
            .then(response => {
                console.log(response.msg)
                cookies.set("forgotpass", {...testAuth, id: response.id});
                setCode({border: "1px solid black"})
                navigate('/resetpassword');
            })
            .catch(error => {
                setErrorMsg(error.response.data.message)
                console.log(error.response.data.message || 'Invalid verification code. Please try again.')
                setCode({border: "1px solid red"})
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
                    <p id = "weSentEmail">We sent an email to {testAuth.email}. Please enter the verification code sent to your email to proceed.</p>
                    {errorMsg && <p id='errorMessage'>{errorMsg}</p>}
                <form>
                    <div id="formContent">
                        <label htmlFor="code">Enter Code</label>
                        <input type="text" name="code" value={resetPwdVerificationCode} style={code} onChange={(e) => setResetPwdVerificationCode(e.target.value)} />
                        <div id="mfaButtons">
                            <a href="/forgotpassword" id="mfaBack">Cancel</a>
                            <button type="submit" id="mfaSubmit" onClick={handleVerification}>Verify Reset Code</button>
                        </div>
                    </div>
                    <br/>
                </form>
            </div>
        </div>
    )
    



}
export default PasswordMFA