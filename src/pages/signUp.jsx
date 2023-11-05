import React, { useState } from 'react'
import axios from 'axios'
import TermsCondition from "../components/termsConditions";
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

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return
        }

        try {
            const response = await axios.post('http://localhost:4000/signup', formData)
            
            if (response.status === 201) {
                console.log('User sign up successfully');
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
                            <input type="text" name="password" placeholder="Enter password here..." value={formData.password} onChange={handleChange}/>
                        </label>
                        <br/>
                        <label>Enter Password Again
                            <input type="text" name="confirmPassword"placeholder="Enter password again..." value={formData.confirmPassword} onChange={handleChange}/>
                        </label>
                        <br/>
                        <div id="checkboxDiv">
                            
                            <label for="terms" id="checkboxlabel">
                                <input type="checkbox" name="terms" value="terms"/>
                                I accept the <TermsCondition/>
                            </label>
                        </div>
                        
                    </div>
                    <button className="submitButton">Register</button>

                </form>
            </div>
        </div>
    )
};

export default SignUp;