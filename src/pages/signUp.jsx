import React, { useState } from 'react'
import axios from 'axios'
import TermsCondition from "../components/termsConditions";
import "../styles/formStyle.css"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const SignUp = () => {
    const [visible, setVisible] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const [isChecked, setIsChecked] = useState(false)
    const handleCheckbox = () => {
        setIsChecked(prevCheck => !prevCheck)
    }

    const [error, setError] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return
        }
        else if(isChecked === false){
            setError("You must agree to the terms and conditions.")
            return
        }

        try {
            const response = await axios.post('http://localhost:4001/signup', formData)
            
            if (response.status === 201) {
                console.log('User sign up successfully');
                // window.location.href = '/mfa'
            } else {
                const data = await response.json();
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error during sign up: ', error)
        }
    }

    return (
        <div className="formSection">
            <div id="formDesign">
                <h1>Create Your Account</h1>
                <form onSubmit={handleSubmit}>
                    <div id="formContent">
                        <label>Email
                            <input type="text" name="email" placeholder="Enter email here..." value={formData.email} onChange={handleChange}/>
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
                                value={formData.password}
                                onChange={handleChange}
                              />
                              <div className="eye-icon" onClick={() => setVisible(!visible)}>
                                {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                              </div>
                            </div>
                        </label>
                        <br/>
                        <div id="checkboxDiv">
                            <p id='errorMessage'>{ error }</p>
                            
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