import "../styles/password.css"
import image from "../password.png"

const ForgotPassword = () => {
    return (
        <div id="forgotPassword">
            <div id="forgotPasswordForm">
                <div id="imageDiv">
                    <img src={image} alt="testimage"></img>
                </div>
                <form id="passwordForm">
                    
                    <h1>Forgot Password?</h1>
                    <h2>Enter the email address associated with your account.</h2>

                    <input type="text" placeholder="Enter email address here..."/>
                    <br/>
                    {/* this does not exactly make sense, will need to figure out how to route these */}
                    <a href="/mfa" id="forgotNextButton">Next</a>

                </form>
            </div>
        </div>
    )
};

export default ForgotPassword;