import image from "../MU-StackedMU-4C.png";
import '../styles/home.css';
import TermsCondition  from '../components/termsConditions';
import CookiePopup from "../components/cookiepopup";
//---------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';


//const Home = () => {
const Home = () => {
    const [courses, setCourses] = useState([]);
    const [expandedCourse, setExpandedCourse] = useState(null);
    // const [expandedArea, setExpandedArea] = useState(null);
    const [users, setUsers] = useState([]);
    const [minors, setMinors] = useState([]);
    const [majors, setMajors] = useState([]);
    const [certificates, setCertificates] = useState([]);

    const [isUsersOpen, setIsUsersOpen] = useState(true);
    const [isAllCoursesOpen, setIsAllCoursesOpen] = useState(true);
    const [isMinorsOpen, setIsMinorsOpen] = useState(true);
    const [isMajorsOpen, setIsMajorsOpen] = useState(true);
    const [isCertificatesOpen, setIsCertificatesOpen] = useState(true);
    const [expandedArea, setExpandedArea] = useState(true);

//---------------------------------------------------------

useEffect(() => {API.get('DatabaseAPI', '/api')
    .then((response) => console.log(response.json()))
    .catch((error) => {
    console.error('Error fetching user data:', error);
})});

//Courses
    useEffect(() => {
        API.get('DatabaseAPI', '/api/courses')
        .then((response) => console.log(response))
        .then((data) => {
          setCourses(data.courses);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
//Users
    useEffect(() => {
        API.get('DatabaseAPI', '/api/users')
          .then((response) => response.json())
          .then((data) => {
            setUsers(data.users); 
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      }, []);
//Minors
    useEffect(() => {
        API.get('DatabaseAPI', '/api/minors')
          .then((response) => response.json())
          .then((data) => {
            setMinors(data.minors); 
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      }
        , []);
//Majors
    useEffect(() => {
        API.get('DatabaseAPI', '/api/majors')
            .then((response) => response.json())
            .then((data) => {
                setMajors(data.majors); 
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);
//Certificates
    useEffect(() => {
        API.get('DatabaseAPI', '/api/certificates')
            .then((response) => response.json())
            .then((data) => {
                setCertificates(data.certificates); 
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }
        , []);

    const toggleCourse = (courseId) => {
        setExpandedCourse(courseId === expandedCourse ? null : courseId);
    };
     const toggleArea = (areaId) => {
         setExpandedArea(areaId === expandedArea ? null : areaId);
    };
    const toggleMajors = () => {
        setIsMajorsOpen(!isMajorsOpen);
      };
    
      const toggleCertificates = () => {
        setIsCertificatesOpen(!isCertificatesOpen);
      };
    
        const toggleMinors = () => {
        setIsMinorsOpen(!isMinorsOpen);
        };

        const toggleUsers = () => {
        setIsUsersOpen(!isUsersOpen);
        };

        const toggleAllCourses = () => {
        setIsAllCoursesOpen(!isAllCoursesOpen);
        }

//---------------------------------------------------------
    return (
        <div>
            <div className="intro">
                <img src={image} alt="mulogo" className="muphoto"></img>
                <h1>PLANNING YOUR DEGREE, MADE EASY</h1>
                <p>The Mizzou Engineering Degree Audit is a website made by students for students. We wanted to create a usable, understandable, and flexible website to ensure student success.</p>
                <a className="getstarted" href='/audit'>Get Started</a>
                <br />
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
                <TermsCondition />
            </div>
            <div id="testcookie">
                <CookiePopup />
            </div>
            {/* ------------------------------------------------------- */}
            {/* Courses */}
            <div className="courses">
                <h1>Course List
                    <button onClick={toggleAllCourses}>
                        {isAllCoursesOpen ? '^' : '⌄'}
                    </button>
                </h1>
                {isAllCoursesOpen &&
                    courses.map((courseGroup) => (
                    <div key={courseGroup._id}>
                        <h3>{courseGroup.area}
                            <button onClick={() => toggleArea(courseGroup._id)}>
                                {expandedArea === courseGroup._id ? '^' : '⌄'}
                            </button>
                        </h3>
                        {expandedArea === courseGroup._id && (
                            <div>
                                <p>{courseGroup.description}</p>
                            </div>
                        )}
                        <ul>
                            {courseGroup.courses.map((course) => (
                                <li key={course._id}>
                                    <h4 onClick={() => toggleCourse(course._id)}>
                                        {course.name} {expandedCourse === course._id ? '^' : '⌄'}
                                    </h4>
                                    {expandedCourse === course._id && (
                                        <div>
                                            <p>Credit: {course.credit}</p>
                                            <p>PreReq: {course.prerequisites}</p>
                                            <p>Description: {course.description}</p>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                ))}
            </div>
            {/* Users */}
            <div className="user-data">
                <h1>User Data
                <button onClick={toggleUsers}>
                        {isUsersOpen ? '^' : '⌄'}
                    </button>
                </h1>
                <ul>
                {isUsersOpen && users.map((user) => (
                        <li key={user._id}>
                            <p>Email: {user.email}</p>
                            <p>Password: {user.password}</p>
                            <p>Major: {user.major}</p>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Minors */}
            <div className="minor-data">
                <h1>Minor Data
                <button onClick={toggleMinors}>
                        {isMinorsOpen ? '^' : '⌄'}
                    </button>
                </h1>
                {isMinorsOpen &&
                    minors.map((minor) => (
                    <div key={minor?._id}>
                        <h3>{minor?.title}</h3>
                        <p><strong>URL:</strong> <a href={minor?.url}>{minor?.url}</a></p>
                        {minor?.courses && minor?.courses.map((course) => (
                            <div key={course?._id}>
                                <h4>{course?.label}</h4>
                                <ul>
                                    {course?.list && course.list.map((item) => (
                                        <li key={item?._id}>
                                            <p>{item?.id}</p>
                                            <p><strong>Or:</strong> {item?.or ? item?.or.join(', ') : ''}</p>
                                        </li>
                                    ))}
                                </ul>
                                {course?.info && course.info.map((info) => (
                                    <p key={info?._id}><strong>Comment:</strong> {info?.comment}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {/* Majors */}
            <div className="major-data">
                <h1>
                    Major Data
                    <button onClick={toggleMajors}>
                        {isMajorsOpen ? '^' : '⌄'}
                    </button>
                </h1>
                {isMajorsOpen &&
                    majors.map((major) => (
                        <div key={major?._id}>
                            <h3>{major?.title}</h3>
                            <p>
                                <strong>URL:</strong>{' '}
                                <a href={major?.url} target="_blank" rel="noreferrer">
                                    {major?.url}
                                </a>
                            </p>
                            {major?.courses && major.courses.map((course) => (
                                <div key={course?._id}>
                                    <h4>{course?.label}</h4>
                                    <ul>
                                        {course?.list && course.list.map((item) => (
                                            <li key={item?._id}>
                                                <p>{item?.id}</p>
                                                <p>
                                                    <strong>Or:</strong>{' '}
                                                    {item?.or ? item?.or.join(', ') : ''}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                    {course?.info && course.info.map((info) => (
                                        <p key={info?._id}>
                                            <strong>Comment:</strong> {info?.comment}
                                        </p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
            </div>
            {/* Certificate Data */}
            <div className="certificate-data">
                <h1>
                    Certificate Data
                    <button onClick={toggleCertificates}>
                        {isCertificatesOpen ? '^' : '⌄'}
                    </button>
                </h1>

                {isCertificatesOpen &&
                    certificates.map((certificate) => (
                        <div key={certificate?._id}>
                            <h3>{certificate?.title}</h3>
                            <p>
                                <strong>URL:</strong>{' '}
                                <a href={certificate?.url} target="_blank" rel="noreferrer">
                                    {certificate?.url}
                                </a>
                            </p>
                            {certificate?.courses && certificate.courses.map((course) => (
                                <div key={course?._id}>
                                    <h4>{course?.label}</h4>
                                    <ul>
                                        {course?.list && course.list.map((item) => (
                                            <li key={item?._id}>
                                                <p>{item?.id}</p>
                                                <p>
                                                    <strong>Or:</strong>{' '}
                                                    {item?.or ? item?.or.join(', ') : ''}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                    {course?.info && course.info.map((info) => (
                                        <p key={info?._id}>
                                            <strong>Comment:</strong> {info?.comment}
                                        </p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
            </div>
        </div>
    );
};

//---------------------------------------------------------

export default Home;