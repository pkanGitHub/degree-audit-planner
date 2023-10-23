import "../styles/password.css"

const ForgotPassword = () => {
    return (
        <div className="formSection">
            <form id="formDesign">
                <h1>Forgot Password?</h1>
                <label>Email:
                    <input type="text"/>
                </label>
                <br/>
                <a href="/resetpassword" className="nextButton">Next</a>

            </form>
        </div>
    )
};

export default ForgotPassword;