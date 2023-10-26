import "../styles/formStyle.css"

const MFA = () => {
    return(
        <div className="formSection">
            <div id="formDesign" className="mfa">
                <h1>2-Step Verification</h1>
                <h2>Please confirm this is you. We sent a verification code to your email.</h2>
                <form>
                    <div id="formContent">
                        <label for="code">Enter Code</label>          
                        <input type="text" name="code"/>
                    </div>
                    <br/>
                    <button className="submitButton">Submit</button>
                    <br/>
                    <a href="/forgotpassword">Cancel</a>
                </form>
            </div>
        </div>
    )
}

export default MFA;