import "../styles/formStyle.css"


const Login = () => {
    return (
        <div className="formSection">
            <div id="formDesign">
                <h1>Login</h1>
                <form>
                    
                    <div id="formContent">
                        <label >Email</label>          
                        <input type="text" name="loginemail" placeholder="Enter email here..."/>
                        <br/>
                        <label>Password</label>
                        <input type="text" name="loginemail" placeholder="Enter password here..."/>
        
                        <a href="/forgotpassword">Forgot Password?</a>
                    </div>
                    
                    <br/>
                    <button className="submitButton">Login</button>
                    <br/>
                    <a href="/signup">Don't have an account? Sign up here!</a>

                </form>
            </div>
        </div>
    )
};

export default Login;