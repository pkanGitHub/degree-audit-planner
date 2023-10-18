import Popup from 'reactjs-popup';
import "../styles/terms.css"
import 'reactjs-popup/dist/index.css';



const TermsCondition = () => {
    return(
        <Popup trigger=
            {<button id='termsButton'> Terms and Conditions </button>} 
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
                            <h4>Last Updated: 10.17.23</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur justo ante, nec rhoncus urna faucibus eu. Donec vehicula enim pretium orci iaculis tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a ipsum vehicula, ultrices ex quis, convallis magna. Fusce ullamcorper sem et efficitur pellentesque. Morbi eget aliquet lectus. Ut nec ornare magna, vitae faucibus ligula. Etiam vitae sagittis neque, eget auctor magna.</p>
                        </div>
                    </div>
                )
            }
        </Popup>
    )
}
export default TermsCondition;