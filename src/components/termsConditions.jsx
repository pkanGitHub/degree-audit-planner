import Popup from 'reactjs-popup';
import "../styles/terms.css"
import 'reactjs-popup/dist/index.css';



const TermsCondition = () => {
    const handleClick = (event) => {
        event.preventDefault();
    }
    return(
        <Popup trigger=
            {<button id='termsButton' onClick={handleClick}> Terms and Conditions </button>} lockScroll={true} keepTooltipInside={true}
            modal nested>
            {
                close => (
                    <div className='terms'>
                        <div className='termsInfo'>
                            <button id='close' onClick=
                                {() => close()}>
                                    X
                            </button>
                            <h1>Terms and Conditions</h1>
                            <h4>Last Updated: 11.14.23</h4>
                            <p><b>Uploading transcript:</b> I understand that when I upload my transcript, my personal data will be grabbed by this website. I understand that my data will not be stored on this website, but that this website will be able to see my data before it is dumped.</p>
                            <p><b>Account creation:</b> I understand that I must use a valid email address to sign up for this service. I understand that this email address will be used by this website to send me authentication emails. I understand that this website will not send me emails about anything other than account security updates. I understand that if I do not verify my account within 30 days, my information will not be saved.</p>
                        </div>
                    </div>
                )
            }
        </Popup>
    )
}
export default TermsCondition;