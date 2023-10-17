import "../styles/password.css"

const ResetPassword = () => {
    return (
        <div className="formSection">
            <form id="formDesign">
                <h1>Reset Password</h1>
                <label>Email:
                    <input type="text"/>
                </label>
                <br/>
                <label>New password:
                    <input type="text"/>
                </label>
                <br/>
                <label>Confirm new password:
                    <input type="text"/>
                </label>
                <br/>
                <a href="/login" className="backButton">Back</a>
                {/* will want this to have a pop up that says "password has been successfully changed*/}
                <button className="submitButton">Confirm Changes</button>

            </form>
        </div>
    )
};

export default ResetPassword;