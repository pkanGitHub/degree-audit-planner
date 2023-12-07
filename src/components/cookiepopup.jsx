import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../styles/cookie.css"
import { useNavigate } from 'react-router-dom';

const CookiePopup = () => {
    const navigate = useNavigate()
    return(
        <Popup contentStyle={{borderRadius: "1px", maxheight: "fit-content"}} defaultOpen={true} lockScroll={true} keepTooltipInside={true} closeOnDocumentClick={false}
            modal nested>
                {
                close => (
                    
                    <div id='cookieInfo'>
                        
                        <div id='cookieAbout'>
                            <h1 id='cookieTitle'>Cookie Notice</h1>
                            <p id='cookieData'>We use only functional cookies to keep track of if you are logged in or not on this website. We do not send your information to third party sites. <br/><br/>If you do not accept, the website will not work properly and you will be redirected to the homepage. To proceed, please click Accept.</p>
                            <div id='cookieButtons'>
                                <button id='cookieclose' onClick=
                                    {() =>  navigate("/")}>
                                        Decline
                                </button>
                                <button id='cookieclose' onClick=
                                    {() => close()}>
                                        Accept
                                </button>
                            </div>
                        </div>
                    </div>
                    
                )
            }

        </Popup>
    )
}

export default CookiePopup;