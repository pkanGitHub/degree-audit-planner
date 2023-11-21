import "../styles/password.css"

const ResetPassword = () => {
    return (
        <div className="formSection">
            <div id="formDesign">

                <h1>Reset Password</h1>

                <p>For user: some_username_here, use cookies</p>
                <form>
                    
                    <div id="formContent">
                        <label>New Password
                            <input type="text"/>
                        </label>
                        <br/>
                        <label>Confirm New Password
                            <input type="text"/>
                        </label>
                    </div>
                    
                    <br/>
                    <div id="buttons">
                        <a href="/forgotpassword" id="backButton">Back</a>
                        {/* will want this to have a pop up that says "password has been successfully changed*/}
                        <button id="confirm">Confirm Changes</button>
                    </div>
                    

                </form>
            </div>
        </div>
    )
};

export default ResetPassword;