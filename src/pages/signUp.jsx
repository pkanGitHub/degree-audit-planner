import React, { useState } from 'react'
import axios from 'axios'
import TermsCondition from "../components/termsConditions";
import { API } from 'aws-amplify';
import "../styles/formStyle.css"

const SignUp = () => {
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

        API.post('DatabaseAPI', "/auth/signup", { body: formData })
        .then(response => {
            console.log(`response: ${response}`);
            console.log('User sign up successfully');
            window.location.href = '/mfa'
        })
        .catch(error => {
            console.error(error.response.data.message);
        })
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
                            <input type="password" name="password" placeholder="Enter password here..." value={formData.password} onChange={handleChange}/>
                        </label>
                        <br/>
                        <label>Enter Password Again
                            <input type="password" name="confirmPassword"placeholder="Enter password again..." value={formData.confirmPassword} onChange={handleChange}/>
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