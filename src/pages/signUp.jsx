import TermsCondition from "../components/termsConditions";
import "../styles/formStyle.css"

const SignUp = () => {
    return (
        <div className="formSection">
            <div id="formDesign">
                <h1>Create Your Account</h1>
                <form>
                    <div id="formContent">
                        <label>Email
                            <input type="text" placeholder="Enter email here..."/>
                        </label>
                        <br/>
                        <label>Password
                            <input type="text" placeholder="Enter password here..."/>
                        </label>
                        <br/>
                        <label>Enter Password Again
                            <input type="text" placeholder="Enter password again..."/>
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