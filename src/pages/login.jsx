import React, {useState} from 'react';
import "../styles/formStyle.css";
import Cookies from 'universal-cookie';
import CookiePopup from '../components/cookiepopup';

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
                cookies.set("user2", {email: formData.email, password: formData.password, programs: []}, {expires: tomorrow}) // takes data and adds it to cookie
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

  
    // grabs today's date and then sets the date to tomorrow, used for cookie expiry
    var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);


    const cookies = new Cookies(null);

    // this is a test to see how information from that works, DELETE WHEN COMPLETED
    cookies.set("user", {email: "test", password: "password", testCategories: [{type: "majors", category: "BS in Information Technology"}, {type: "majors", category: "BS in Information Technology"}]}, {expires: tomorrow})

    return (
        <div className="formSection">
            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
  
            <p></p>
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

            <CookiePopup />
        </div>
    )
}

export default Login