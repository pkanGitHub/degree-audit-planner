import '../styles/home.css';
import TermsCondition  from '../components/termsConditions';
import CookiePopup from "../components/cookiepopup";
import autoCard from "../auto.jpg"
import manualCard from "../manual.jpg"
import tutorialCard from "../tutorial.jpg"

//---------------------------------------------------------
import React, { useState, useEffect } from 'react';
//const Home = () => {
    const Home = () => {
        // const [courses, setCourses] = useState([]);
        // const [expandedCourse, setExpandedCourse] = useState(null);
        // const [expandedArea, setExpandedArea] = useState(null);
        // const [users, setUsers] = useState([]);
        // const [minors, setMinors] = useState([]);
        // const [majors, setMajors] = useState([]);
        // const [certificates, setCertificates] = useState([]);

        // const [isUsersOpen, setIsUsersOpen] = useState(true);
        // const [isAllCoursesOpen, setIsAllCoursesOpen] = useState(true);
        // const [isMinorsOpen, setIsMinorsOpen] = useState(true);
        // const [isMajorsOpen, setIsMajorsOpen] = useState(true);
        // const [isCertificatesOpen, setIsCertificatesOpen] = useState(true);
        // const [expandedArea, setExpandedArea] = useState(true);

//---------------------------------------------------------
//Courses
    // useEffect(() => {
    //   fetch('http://localhost:4001/api/courses')
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setCourses(data.courses);
    //     })
    //     .catch((error) => {
    //       console.error('Error fetching data:', error);
    //     });
    // }, []);
//Users
    // useEffect(() => {
    //     fetch('http://localhost:4001/api/users')
    //       .then((response) => response.json())
    //       .then((data) => {
    //         setUsers(data.users);
    //       })
    //       .catch((error) => {
    //         console.error('Error fetching user data:', error);
    //       });
    //   }, []);
//Minors
    // useEffect(() => {
    //     fetch('http://localhost:4001/api/minors')
    //       .then((response) => response.json())
    //       .then((data) => {
    //         setMinors(data.minors);
    //       })
    //       .catch((error) => {
    //         console.error('Error fetching user data:', error);
    //       });
    //   }
    //     , []);
//Majors
    // useEffect(() => {
    //     fetch('http://localhost:4001/api/majors')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setMajors(data.majors);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching user data:', error);
    //         });
    // }, []);
//Certificates
    // useEffect(() => {
    //     fetch('http://localhost:4001/api/certificates')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setCertificates(data.certificates);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching user data:', error);
    //         });
    // }
    //     , []);

    // const toggleCourse = (courseId) => {
    //     setExpandedCourse(courseId === expandedCourse ? null : courseId);
    // };
    //  const toggleArea = (areaId) => {
    //      setExpandedArea(areaId === expandedArea ? null : areaId);
    // };
    // const toggleMajors = () => {
    //     setIsMajorsOpen(!isMajorsOpen);
    //   };

    //   const toggleCertificates = () => {
    //     setIsCertificatesOpen(!isCertificatesOpen);
    //   };

        // const toggleMinors = () => {
        // setIsMinorsOpen(!isMinorsOpen);
        // };

    //     const toggleUsers = () => {
    //     setIsUsersOpen(!isUsersOpen);
    //     };

        // const toggleAllCourses = () => {
        // setIsAllCoursesOpen(!isAllCoursesOpen);
        // }

//---------------------------------------------------------
    return (
        <div>
            <div className="intro">
                <header>
                    <h2 id="mizEngineering">College of Engineering</h2>
                    <h2 id="degreePlanner">MIZZOU'S DEGREE PLANNER</h2>
                </header>
                <a className="getstarted" href='/audit'>
                <button class="getStart">GET STARTED TODAY</button>
                </a>
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
            <div id="testcookie">
                <CookiePopup />
            </div>
            </div>
    );
};

export default Home;