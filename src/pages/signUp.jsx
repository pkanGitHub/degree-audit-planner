const SignUp = () => {
    return (
        <div className="formSection">
            <form id="formDesign">
                <h1>Create Your Account</h1>
                <label>Email:
                    <input type="text"/>
                </label>
                <br/>
                <label>Password:
                    <input type="text"/>
                </label>
                <br/>
                <label>Enter Password Again:
                    <input type="text"/>
                </label>
                <br/>
                <input type="checkbox" name="terms" value="terms"/>
                <label for="terms"> I have read the <a href="/">Terms and Conditions</a></label>
                <br/>
                <button className="submitButton">Register</button>

            </form>
        </div>
    )
};

export default SignUp;