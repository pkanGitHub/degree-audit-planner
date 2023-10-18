import image from "../MU-StackedMU-4C.png";
import '../styles/home.css';
import TermsCondition  from '../components/termsConditions';

const Home = () => {
    return (
        <div>
            <div className="intro">
                <img src={image} alt="mulogo" className="muphoto"></img>
                <h1>PLANNING YOUR DEGREE, MADE EASY</h1>
                <p>The Mizzou Engineering Degree Audit is a website made by students for students. We wanted to create a usable, understandable, and flexible website to ensure student success.</p>
                <a className="getstarted" href='/audit'>Get Started</a>
                <br/>
                <a href="/tutorial">Need help?</a>
            </div>

            <h1 id="startingTitle">How to get started</h1>

            {/* might need to use columns if possible */}
            <div className="miniTutorial">
                <div className="transcript">
                    <h4>Upload Transcript</h4>
                    <p>Download your unofficial transcript from MyZou and upload it here for easy use!</p>
                </div>
                <div className="transcript">
                    <h4>Do it yourself</h4>
                    <p>Use this feature when you do not have your unofficial transcript on hand.</p>
                </div>

            </div>
            <div className="terms">
                <TermsCondition/>
            </div>
            
        </div>
    )
};

export default Home;