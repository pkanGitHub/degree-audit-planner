import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import image from "../Cookie.png"
import "../styles/cookie.css"

const CookiePopup = () => {
    return(
        <Popup contentStyle={{borderRadius: "25px", width: "30%", height: "30%"}} trigger=
            {<button id='cookie'>Cookie</button>} 
            modal nested>
                {
                close => (
                    
                    <div id='cookieInfo'>
                        <img src={image} alt='cookie' id='cookieImage'></img>
                        <h1 id='cookieTitle'>Cookie Settings</h1>
                        <p id='cookieData'>We use cookies to save your progress on this website, and to remember you when you return.</p>
                        <button id='cookieclose' onClick=
                            {() => close()}>
                                Accept
                        </button>
                    </div>
                    
                )
            }

        </Popup>
    )
}

export default CookiePopup;