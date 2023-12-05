import "../styles/password.css"
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { read } from '../lib/user';
import { API } from 'aws-amplify';

const ResetPassword = () => {
    const cookies = new Cookies(null);
    const user = cookies.get("user");
    const loggedIn = Boolean(user?.id);

    if (!loggedIn) window.location.href = '/';

    // let testAuth = null;
    // try{
    //     testAuth = cookies.get("forgotpass")
    //     if(testAuth === undefined){
    //         testAuth = "";
    //     }
    // }
    // catch(err){
    //     console.log(err)
    // }

    useEffect(() => {
        if (!user?.email) read(user.id);
    })

    const [error, setError] = useState("")


    const [data, setData] = useState({email: user.email, password: "", passwordAgain: ""})

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
            API.post('DatabaseAPI', "/auth/resetpassword", { body: data })
            .then(response => {
                console.log('Server Response:', response);
                console.log('Password change successful!')
                alert("You have successfully changed your password!")
                window.location.href = '/'
            })
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

                <p>For User: {user.email}</p>
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
                        <a href="/login" id="backButton">Back</a>
                        {/* will want this to have a pop up that says "password has been successfully changed*/}
                        <button type="submit" id="confirm">Confirm Changes</button>
                    </div>
                    

                </form>
            </div>
        </div>
    )
};

export default ResetPassword;