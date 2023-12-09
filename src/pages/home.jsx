import '../styles/home.css';
import TermsCondition from '../components/termsConditions';
import autoCard from "../auto.jpg"
import manualCard from "../manual.jpg"
import tutorialCard from "../tutorial.jpg"
import mizzouLogo from "../MU-StackedMU-4C.png";
import { RightOutlined } from "@ant-design/icons";
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div id='fullpage'>
            <div className="intro">
                <header>
                    <h2 id="mizEngineering">Office of the University Registrar</h2>
                    <h2 id="degreePlanner">MIZZOU'S DEGREE PLANNER</h2>
                </header>
                <a className="getstarted" href='/audit'>
                    <button class="getStart">GET STARTED TODAY</button>
                </a>
            </div>

            <div className="bodyText">
                <h1 id="bodyTitle">Degree Planner</h1>
                <div className="flex-container">
                    <div id="hyperlinksTable">
                        <nav id="sidebarNav">
                            <h3 id="degreeProgramTitle"><b>&gt;</b> Degree Programs and Catalogues</h3>
                            <li id="sub-nav-menu-item">
                                <a href="https://catalog.missouri.edu/" target='_blank' rel='noreferrer'>Catalogs</a>
                            </li>
                            <li id="sub-nav-menu-item">
                                <a href="https://catalog.missouri.edu/archives/" target='_blank' rel='noreferrer'>Archived Catalogs</a>
                            </li>
                            <li id="sub-nav-menu-item">
                                <a href="https://catalog.missouri.edu/degreesanddegreeprograms/" target='_blank' rel='noreferrer'>Degree Programs</a>
                            </li>
                            <h3 id="degreeAuditTitle">Helpful Links</h3>
                            <li id="sub-nav-menu-item">
                                <Link to="/audit">Degree Planner</Link>
                            </li>
                            <li id="sub-nav-menu-item">
                                <Link to="/tutorial">Video Tutorials</Link>
                            </li>
                            <li id="sub-nav-menu-item">
                                <a href="https://registrar.missouri.edu/academic-calendar/" target='_blank' rel='noreferrer'>Academic Calendar</a>
                            </li>
                        </nav>
                    </div>

                    <div id="moreParagraphs">
                        <h2 id="welcomeTitle">Welcome to the Mizzou Degree Planner!</h2>
                        <p id="paragraphs">
                            Our degree planner is a tool for students attending the University of Missouri to review their academic progress toward the completion of their program of study (degree, minor, certificate, etc.) so that students are able to create degree audits. By doing so, students may better prepare for their academic journey by creating customized degree plans for the entirety of their time at the university.
                            <br />
                            <br></br>
                            This tool matches students’ Mizzou and transfer coursework to a program of study’s completion requirements. The degree planner will also account for any other majors, minors, or certificates the student is working towards and/or have completed.
                            <br />
                            <br></br>
                            <p><b><em>This website is to serve as a tool for students to better understand their degree plan. Any degree audits created by this planner are</em> not <em>a substitute for working with an academic advisor. Please reach out to your advisors for specific information about your degree plan.</em></b></p>
                        </p>
                    </div>
                </div>
                <div id="evenMoreParagraphs">
                    <h1 id="startingTitle">Getting Started</h1>
                    <p id="paragraphs">
                        If you have never used the Mizzou Degree Planner before and need to create your first audit, we have two ways to start.
                        <br />
                        <br></br>
                        You can create your first degree planner by <Link to="/audit">(1) uploading your degree audit so that our tool can auto-populate your credits and progress</Link> OR <Link to="/audit">(2) manually choose your classes and credits based on your major(s) and/or minor(s)</Link>. Please keep in mind that <em>your degree information will not be saved for you to revisit upon leaving this website unless you have an account and are logged in</em>.
                        <br />
                        <br></br>
                        When you are ready to create your degree plan you will find the necessary links below to redirect you to where you need to go on our website. If you aren't quite sure on how to start, we have video tutorials that provide a general introduction to this tool.
                    </p>
                </div>
            </div>

            {/* might need to use columns if possible */}
            <div className="miniTutorial">
                <div className="transcript1">
                    <img src={autoCard}></img>
                    <div className="cardText">
                        <h3 className="miniTutTitles">Upload Transcript</h3>
                        <p id="cardParagraph">Download your unofficial transcript from MyZou and upload it here for easy use!</p>
                        <Link class="uploadTranscriptHere" to="/audit">
                            <button class="auto">Upload your transcript here</button>
                        </Link>
                    </div>
                </div>
                <div className="transcript2">
                    <img src={manualCard}></img>
                    <div className="cardText">
                        <h3 className="miniTutTitles">Do It Yourself</h3>
                        <p id="cardParagraph">Use this feature when you do not have your unofficial transcript on hand.</p>
                        <Link class="uploadTranscriptHere" to="/audit">
                            <button class="tutorialCardButton">Set up your audit planner here</button>
                        </Link>
                    </div>
                </div>
                <div className="transcript2">
                    <img src={tutorialCard}></img>
                    <div className="cardText">
                        <h3 className="miniTutTitles">Still Confused?</h3>
                        <p id="cardParagraph">Still not sure on how to start? Do not fear - we have several tutorials to get you started!</p>
                        <Link class="uploadTranscriptHere" to="/tutorial">
                            <button class="manual">Take me to the tutorial</button>
                        </Link>
                    </div>
                </div>
            </div>

            <footer>
                <div id="footerContent">
                    <div id="mizLogoTag">
                        <img src={mizzouLogo} alt='mizzouLogo' id='mizzouLogo'></img>
                        <Link to="/" id='uniTitle'>University of Missouri</Link>
                    </div>
                    <div className="terms">
                        <TermsCondition />
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default Home;