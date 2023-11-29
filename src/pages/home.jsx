import '../styles/home.css';
import TermsCondition  from '../components/termsConditions';
import autoCard from "../auto.jpg"
import manualCard from "../manual.jpg"
import tutorialCard from "../tutorial.jpg"

//---------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { fetchGet,getCerts,getCourseList,getMajors } from '../lib/data';
import { Link } from 'react-router-dom';


//const Home = () => {
const Home = () => {
    return (
        <div>
            <div className="intro">
                <header>
                    <h2 id="mizEngineering">College of Engineering</h2>
                    <h2 id="degreePlanner">MIZZOU'S DEGREE PLANNER</h2>
                </header>
                <Link className="getstarted" to='/audit'>
                <button class="getStart">GET STARTED TODAY</button>
                </Link>
            </div>

            <div className="bodyText">
                <h1 id="welcomeTitle">Welcome!</h1>
                <h1 id="startingTitle">Getting Started</h1>
            </div>

            {/* might need to use columns if possible */}
            <div className="miniTutorial">
                <div className="transcript1">
                    <img src={autoCard}></img>
                    <div className="cardText">
                        <h3 className="miniTutTitles">Upload Transcript</h3>
                            <p>Download your unofficial transcript from MyZou and upload it here for easy use!</p>
                            <a class="uploadTranscriptHere" href="/audit">
                                <button class="auto">Upload your transcript here</button>
                            </a>
                    </div>
                </div>
                <div className="transcript2">
                    <img src={manualCard}></img>
                    <div className="cardText">
                        <h3 className="miniTutTitles">Do it yourself</h3>
                            <p>Use this feature when you do not have your unofficial transcript on hand.</p>
                            <a class="uploadTranscriptHere" href="/audit">
                                <button class="tutorialCardButton">Set up your audit planner here</button>
                            </a>
                    </div>
                </div>
                <div className="transcript2">
                    <img src={tutorialCard}></img>
                    <div className="cardText">
                        <h3 className="miniTutTitles">Still Confused?</h3>
                            <p>Still not sure on how to start? Do not fear - we have several tutorials to get you started!</p>
                            <a class="uploadTranscriptHere" href="/tutorial">
                                <button class="manual">Take me to the tutorial</button>
                            </a>
                    </div>
                </div>
            </div>

            <div className="tutorialButton">
                <a class="tlink" href="/tutorial">
                    <button class="tutBut">TAKE ME TO THE TUTORIAL</button>
                </a>
            </div>
            <div className="terms">
                <TermsCondition />
            </div>

        </div>
    );
};

export default Home;