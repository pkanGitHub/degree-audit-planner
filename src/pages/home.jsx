import '../styles/home.css';
import TermsCondition  from '../components/termsConditions';
import autoCard from "../auto.jpg"
import manualCard from "../manual.jpg"
import tutorialCard from "../tutorial.jpg"
import mizzouLogo from "../MU-StackedMU-4C.png";
import { RightOutlined } from "@ant-design/icons";
import React from 'react';
import { Link } from 'react-router-dom'; 


//---------------------------------------------------------
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
                                    <a href="https://catalog.missouri.edu/">Catalogs</a>
                                </li>
                                <li id="sub-nav-menu-item">
                                    <a href="https://catalog.missouri.edu/archives/">Archived Catalogs</a>
                                </li>
                                <li id="sub-nav-menu-item">
                                    <a href="https://catalog.missouri.edu/degreesanddegreeprograms/">Degree Programs</a>
                                </li>
                        <h3 id="degreeAuditTitle">Helpful Links</h3>
                                <li id="sub-nav-menu-item">
                                    <a href="/audit">Degree Planner</a>
                                </li>
                                <li id="sub-nav-menu-item">
                                    <a href="/tutorial">Video Tutorials</a>
                                </li>
                                <li id="sub-nav-menu-item">
                                    <a href="https://registrar.missouri.edu/academic-calendar/">Academic Calendar</a>
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
                       <em>Any degree audits created by this planner is <b>not</b> a substitute for working with an academic advisor.</em>
                        </p>
                        </div>
                    </div>
                <div id="evenMoreParagraphs">
                <h1 id="startingTitle">Getting Started</h1>
                    <p id="paragraphs">
                    If you have never used the Mizzou Degree Planner before and need to create your first audit, we have two ways to start.
                    <br />
                    <br></br>
                    You can create your first degree planner by <a href="/audit">(1) uploading your degree audit so that our tool can auto-populate your credits and progress</a> OR <a href="/audit">(2) manually choose your classes and credits based on your major(s) and/or minor(s)</a>. Please keep in mind that <em>your degree information will not be saved for you to revisit upon leaving this website unless you have an account and are logged in</em>.
                    <br />
                    <br></br>
                    When you are ready to create your degree plan you will find the necessary links below to redirect you to where you need to go on our website. If you aren't quite sure on how to start, we have video tutorials that provide a general introduction to this tool. Please keep in mind that <em><b>your degree information will not be saved for you to revisit upon leaving this website unless you have an account and are logged in</b></em>
                    </p>
                </div>
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

            <footer>
                <div id = "footerContent">
                <div id = "mizLogoTag">
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