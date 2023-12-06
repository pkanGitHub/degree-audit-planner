import React, { useState } from 'react'
import axios from 'axios'
import TermsCondition from "../components/termsConditions";
import { API } from 'aws-amplify';
import "../styles/formStyle.css"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import Cookies from 'universal-cookie';
import { redirect, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [visible, setVisible] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [againBorder, setAgain] = useState({border: "2px solid lightgray"})
    const [passwordBorder, setPasswordBorder] = useState({border: "2px solid lightgray"})
    const [emailBorder, setEmail] = useState({border: "2px solid lightgray"})

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const [isChecked, setIsChecked] = useState(false)
    const handleCheckbox = () => {
        setIsChecked(prevCheck => !prevCheck)
    }

    const [error, setError] = useState("")

    const navigate = useNavigate();
    const cookies = new Cookies(null);
    if (cookies.get("user")?.id) navigate('/audit');


    const handleSubmit = async (event) => {
        event.preventDefault()
        if(!formData.email){
            setError("You must enter an email.")
            setEmail({border: "2px solid red"})
            setAgain({border: "2px solid lightgray"})
            setPasswordBorder({border: "2px solid lightgray"})
            
        }
        else if(!formData.password){
            setError("You must enter a password.")
            setEmail({border: "2px solid lightgray"})
            setAgain({border: "2px solid lightgray"})
            setPasswordBorder({border: "2px solid red"})
            
        }
        else if(formData.password.length < 9){
            setError("Your password must be longer than 8 characters.")
            setEmail({border: "2px solid lightgray"})
            setAgain({border: "2px solid lightgray"})
            setPasswordBorder({border: "2px solid red"})
            
        }
        else if(!formData.confirmPassword){
            setError("You must re-enter your password.")
            setEmail({border: "2px solid lightgray"})
            setAgain({border: "2px solid red"})
            setPasswordBorder({border: "2px solid lightgray"})
            
        }
        else if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            setEmail({border: "2px solid lightgray"})
            setAgain({border: "2px solid red"})
            setPasswordBorder({border: "2px solid red"})
            
        }
        else if(isChecked === false){
            setError("You must agree to the terms and conditions.")
            
        }

        API.post('DatabaseAPI', "/auth/signup", { body: formData })
        .then(response => {
            console.log(`response: ${response}`);
            console.log('User sign up successfully');
            navigate('/mfa');
        })
        .catch(error => {
            console.error(error);
        })
    }

    return (
        <div className="formSection">
            <div id="formDesign">
                <h1>Create Your Account</h1>
                <p id='errorMessage'>{ error }</p>
                <form onSubmit={handleSubmit}>
                    <div id="formContent">
                        <label>Email
                            <input type="text" name="email" placeholder="Enter email here..." value={formData.email} onChange={handleChange} style={emailBorder}/>
                        </label>
                        <br/>
                        <label>Password
                        <div className="password-input">
                              <input
                                type={visible ? "text" : "password"}
                                name="password"
                                placeholder="Enter password here..."
                                value={formData.password}
                                onChange={handleChange}
                                style={passwordBorder}
                              />
                              <div className="eye-icon" onClick={() => setVisible(!visible)}>
                                {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                              </div>
                            </div>
                        </label>
                        <br/>
                        <label>Enter Password Again
                        <div className="password-input">
                              <input
                                type={visible ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Enter password again..."
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                style={againBorder}
                              />
                              <div className="eye-icon" onClick={() => setVisible(!visible)}>
                                {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                              </div>
                            </div>
                        </label>
                        <br/>
                        <div id="checkboxDiv">
                            
                            
                            <label for="terms" id="checkboxlabel">
                                <input type="checkbox" name="terms" value={isChecked} onChange={handleCheckbox}/>
                                I accept the <TermsCondition/>
                            </label>
                            <br/>
                        </div>
                    </div>
                    <button className="submitButton">Register</button>

                </form>
            </div>
        </div>
    )
};

export default SignUp;