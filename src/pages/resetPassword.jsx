import "../styles/password.css"
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { read } from '../lib/user';
import { API } from 'aws-amplify';
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";    

const ResetPassword = () => {
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const cookies = new Cookies(null);
    const user = cookies.get("user");
    const loggedIn = Boolean(user?.id);

    if (!loggedIn) navigate('/');

    useEffect(() => {
        if (!user?.email) read(user.id);
    })

    const [againBorder, setAgain] = useState({border: "2px solid lightgray"})
    const [passwordBorder, setPasswordBorder] = useState({border: "2px solid lightgray"})

    const [error, setError] = useState("")


    const [data, setData] = useState({email: user.email, password: "", passwordAgain: ""})

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!data.password)
        {
            setError("You must enter a password")
            setAgain({border: "2px solid lightgray"})
            setPasswordBorder({border: "2px solid red"})
            return
        }
        else if(data.password.length < 9)
        {
            setError("Your password must be longer than 8 characters.")
            setAgain({border: "2px solid lightgray"})
            setPasswordBorder({border: "2px solid red"})
            return
        }
        else if (data.password !== data.passwordAgain) {
            setError("Passwords do not match.");
            setAgain({border: "2px solid red"})
            setPasswordBorder({border: "2px solid red"})
            return
        }

        API.post('DatabaseAPI', "/auth/resetpassword", { body: data })
        .then(response => {
            console.log('Server Response:', response);
            console.log('Password change successful!')
            alert("You have successfully changed your password!")
            navigate('/login');
        })
        .catch(error => {
            console.error(error)
            setError('Failed to update password. Please try again.')
        })
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
                            <div className="password-input">
                                <input type={visible ? "text" : "password"} name="password" value={data.password} onChange={handleChange} style={passwordBorder}/>
                                <div className="eye-icon" onClick={() => setVisible(!visible)}>
                                    {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                </div>
                            </div>
                        </label>
                        <br/>
                        <label>Confirm New Password
                            <div className="password-input">
                                <input type={visible2 ? "text" : "password"} name="passwordAgain" value={data.passwordAgain} onChange={handleChange} style={againBorder}/>
                                <div className="eye-icon" onClick={() => setVisible2(!visible2)}>
                                    {visible2 ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                </div>
                            </div>
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