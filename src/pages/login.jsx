import "../styles/formStyle.css"

const Login = () => {
    return (
        <div className="formSection">
            <form id="formDesign">
                <h1>Login</h1>
                <label>Email:
                    <input type="text"/>
                </label>
                <br/>
                <label>Password:
                    <input type="text"/>
                </label>
                <br/>
                <a href="/forgotpassword">Forgot Password?</a>
                <br/>
                <button className="submitButton">Login</button>
                <br/>
                <a href="/signup">Don't have an account? Sign up here!</a>

            </form>
        </div>
    )
};

export default Login;