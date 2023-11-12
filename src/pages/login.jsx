import React, {useState} from 'react'
import "../styles/formStyle.css"

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [errorMsg, setErrorMsg] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
    
        try {
            const response = await fetch('http://localhost:4001/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            })
        
            const data = await response.json()
        
            if (response.ok) {
                console.log('Login successful on the frontend')
                // Redirect
                window.location.href = '/audit'
            } else {
                // show error message on browser or console...
                setErrorMsg(data.message)
                console.log('Login failed on the frontend:', data.message)
            }
          } catch (error) {
            console.error('Error during login on the frontend:', error)
        }
    }
    
      const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        setErrorMsg(null)
      }

    return (
        <div className="formSection">
            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
            <div id="formDesign">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div id="formContent">
                        <label >Email</label>          
                        <input type="text" name="email" placeholder="Enter email here..." value={formData.email} onChange={handleChange}/>
                        <br/>
                        <label>Password</label>
                        <input type="text" name="password" placeholder="Enter password here..." value={formData.password} onChange={handleChange}/>
        
                        <a href="/forgotpassword">Forgot Password?</a>
                    </div>
                    
                    <br/>
                    <button type="submit" className="submitButton">Login</button>
                    <br/>
                    <a href="/signup">Don't have an account? Sign up here!</a>

                </form>
            </div>
        </div>
    )
}

export default Login