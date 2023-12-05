import "../styles/password.css"
import Cookies from "universal-cookie";
import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
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
    const [data, setData] = useState({email: testAuth.email, password: "", passwordAgain: ""})

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!data.password || !data.passwordAgain)
        {
            setError("You must enter a password in both fields.")
            return
        }
        else if (data.password !== data.passwordAgain) {
            setError("Passwords do not match.");
            return
        }

        try {
            const response = await axios.post('http://localhost:4001/resetpassword',  data )
            console.log('Server Response:', response);
            if (response.data.success) {
                console.log('Password change successful!')
                cookies.remove("forgotpass")
                alert("You have successfully changed your password!")
                window.location.href = '/login'
            } else {
                setError('Failed to update password. Please try again.');
            }
        } catch (error) {
            console.error(error)
            setError('Failed to update password. Please try again.')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
        setError(null)
      }
    return (
        <div className="formSection">
            <div id="formDesign">
                <h1>Reset Password</h1>
                <p>For User: {testAuth.email}</p>
                <p id="errorMessage">{error}</p>
                <form onSubmit={handleSubmit}>
                    <div id="formContent">
                        <label>New Password
                            <input type="password" name="password" value={data.password} onChange={handleChange}/>
                        </label>
                        <br/>
                        <label>Confirm New Password
                            <input type="password" name="passwordAgain" value={data.passwordAgain} onChange={handleChange}/>
                        </label>
                    </div>
                    <br/>
                    <div id="buttons">
                        <a href="/forgotpassword" id="backButton">Back</a>
                        {/* will want this to have a pop up that says "password has been successfully changed*/}
                        <button type="submit" id="confirm">Confirm Changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ResetPassword;