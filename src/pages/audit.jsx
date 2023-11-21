import "../styles/audit.css";
import CatalogItems from "../components/catalog";
import { useState, useEffect } from "react";
import GenEdsModel from "../components/genEds";
import ExtraCourses from "../components/extraCourses";
import TransferCourse from "../components/transferCourses";
import SemesterPlan from "../components/semesterplan";
import { getCerts, getCourseList, getGenEds, getMajors, getMinors } from "../lib/data";
import TranscriptUpload from "../components/transcriptUpload";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Cookies from "universal-cookie";

const Audit = () => {
    const [selectType, setType] = useState("");
    const handleTypeChange = (e, index) => {
        setType(e.target.value);
    };

    const [selectCategory, setCategory] = useState("");
    
    const handleCategoryChange = (e, index) => {
        setCategory(e.target.value);
    };

    const [selectTerm, setTerm] = useState("");
    const term = {
        FS21: "Fall 2021",
        SP22: "Spring 2022",
        SM22: "Summer 2022",
    };
    const handleTermChange = (e, index) => {
        setTerm(e.target.value);
    };


    
    // testing add function! this is applied to the mass select, will need to get this to work on the top and other select course
    const [enrollFields, setEnrollFields] = useState([{type: "", category: "", year: ""}])
    
    const handleEnrollFieldChange = (i, e) =>{
        let newFormValues = [...enrollFields];
        newFormValues[i][e.target.name] = e.target.value;
        setEnrollFields(enrollFields);
    }

    

    // gets database data and turns it into a list of objects

    const [minors, setMinors] = useState([]);
    const [majors, setMajors] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [coursesList, setCourses] = useState([]);
    const [genEds, setGenEds] = useState([])

    useEffect(() => {
        getMajors(true).then(val => setMajors(val));
        getMinors(true).then(val => setMinors(val));
        getCerts(true).then(val => setCertificates(val));
        getCourseList(true).then(val => setCourses(val));
        getGenEds(true).then(val => setGenEds(val));
    }, []);


    // this is the user catalog section. this is a list of the type and category that the user has chosen. this is used to loop through database data

    const [userCatalog, setUserCatalog] = useState([{type: "", category: ""}])

    const handleUserCategories = () => {
        setUserCatalog([...userCatalog, {type: selectType, category: selectCategory}])

    }

    const removeCatalog = (index) =>{
        let data = [...userCatalog]
        data.splice(index, 1)
        setUserCatalog(data)
    }
    
    const addCatalog = (type, category) => {
        setUserCatalog([...userCatalog, {type: type, category: category}])
    }

    // this is used to determine the select options based on user's previous choice. if user chooses majors, shows majors, etc.

    let userType = null;
    let options = null;
    let yearOptions = null;

    if (selectType === "majors"){
        userType = majors
    }
    else if (selectType === "minors"){
        userType = minors
    }
    else if (selectType === "certificates"){
        userType = certificates
    }

    if (userType) { 
        yearOptions = userType.map(option => <option key={option?.title}>{option?.title}</option>)
        options = userType.map((option) => <option key={option?.title}>{option?.title}</option>); 
    }


    // this function checks the selected type and category the user has added, filters through the types of lists and then pushes the information into the Catalog Items component. the index is used for deletion purposes.
    
    function getCourses(type, category, index){
        let selectedType = [];
        if (type === "majors"){
            selectedType = majors
        }
        else if (type === "minors"){
            selectedType = minors
        }
        else if (type === "certificates"){
            selectedType = certificates
        }
        else if (category === ""){
            category = "default"
        }


        return(
            <CatalogItems type={selectedType} category={category} coursesList={coursesList} removeCatalog={() => removeCatalog(index)}/>
        )

    }

    // delete button/refresh page button

    const [state, setState] = useState(0) // when clicked, refreshes state on the gen eds, transfer, and elective courses
    const refreshPage=()=> {
        setUserCatalog([{type: "", category: ""}])
        setState(state+1)
    }

    const deleteAlert = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                  <div className='confirmButton'>
                    <h1>Confirm Delete</h1>
                    <p>Are you sure you want to delete your progress? No programs or classes will be saved.</p>
                    <div id="confirmButtonsDiv">
                        <button id="no" onClick={onClose}>No</button>
                        <button id="yes"
                        onClick={() => {
                            refreshPage();
                            onClose();
                        }}
                        >
                        Yes
                        </button>
                    </div>
                    
                  </div>
                );
              }
    })
    }
    const cookies = new Cookies(null);
    const cookieData =  cookies.get("user2")

    let calendarHeading = "" // this is the banner over the calendar
    let testCatalog = [];

    // testing for adding existing courses to page on load DELETE AFTER FINISH TESTING
    useEffect(()=> {
        setUserCatalog(testCatalog)
    }, [])

    if (cookieData !== undefined){
        calendarHeading = `${cookieData.email} Degree Planner`
        if(cookieData.testCategories!== undefined){
            cookieData.testCategories.map(item => testCatalog.push(item))
        }
    }
    else{
        calendarHeading = "Degree Planner"
    }

    // this is testing for user information, may want to use this to query data, can do this in use effect!

    let testAuth = null;
    try{
        testAuth = cookies.get("user")
        if(testAuth === undefined){
            testAuth = "";
        }
    }
    catch(err){
        console.log(err)
    }
    

  
    return (
        <body id="fullpage">
            <div id="header">
                <TranscriptUpload set={addCatalog}/>
                <br/>
                <a href="/tutorial" target="_blank">Need Help?</a>
            </div>
            <div id='contents'>
            
                <div id="audit">
                    <p>{testAuth.email}{testAuth.password}</p>

                    <div id="enrollmentSelection">
                        {/* https://www.youtube.com/watch?v=XtS14dXwvwE */}
                        {enrollFields.map((input, index) => {
                            return(
                                <div key={index} id="addedSectionEnroll">
                                    <label>
                                        Type:&nbsp;&nbsp;
                                        <select name='type' value={input.type} onChange={(e) => {handleTypeChange(e); handleEnrollFieldChange(index, e)}}>
                                            <option value="default"></option>
                                            <option value="majors">Major</option>
                                            <option value="minors">Minor</option>
                                            <option value="certificates">Certificate</option>
                                        </select>
                                    </label>
                                    <label>
                                        Year:&nbsp;&nbsp;
                                        <select name='year' value={input.year} onChange={(e)=>{handleTermChange(e); handleEnrollFieldChange(index, e)}}>
                                            <option value="default"></option>
                                            { yearOptions }
                                        </select>
                                    </label>
                                    <label>
                                        Category:&nbsp;&nbsp;
                                        <select name='category' value={input.category} onChange={(e)=> {handleCategoryChange(e); handleEnrollFieldChange(index, e)}}>
                                            <option value="default"></option>
                                            { options }
                                        </select>
                                    </label>
                                
                                </div>
                            )
                        })}
                        <button id="programButton" onClick={handleUserCategories}>Add Program</button>
                    </div>
                    <hr/>

                    
                    <GenEdsModel key={state} genEds={genEds} coursesList={coursesList}/>

            
                    {/* this is a map that gets all user input programs here, user can delete or add programs */}
                    { userCatalog.map((key, index) =>
                        <div key={index}>

                            { getCourses(key.type, key.category, index) }    
            
                        </div>
                        )
                    }

                    {/* <MajorTest majors={majors} coursesList={coursesList}/> */}

                    <div>
                        <h2>Elective Courses</h2>
                        <p>If you have other courses you have taken that are outside of your major or transfer courses, enter them here:</p>
                        <ul className="accordion">
                            <li>
                                <input type="checkbox" name="accordion" id="elective" />
                                <label id="genReqLabel" htmlFor="elective">Mizzou Courses:</label>
                                <div className="classHistory">

                                    <ExtraCourses key={state} coursesList={coursesList}/>
                                </div>
                            </li>
                        </ul>

                        <ul className="accordion">
                            <li>
                                <input type="checkbox" name="accordion" id="transfer" />
                                <label id="genReqLabel" htmlFor="transfer">Transfer Courses:</label>
                                <div className="classHistory">

                                    <TransferCourse key={state}/>
                                </div>
                            </li>
                        </ul>

                    </div>


                    <div id='optionButtons'>
                        <button id='saveButton'>Save</button>
                        <button id='exportButton'>Export</button>
                        <button id='deleteButton' onClick={deleteAlert}>Delete</button>
                    </div>
                </div>
                <hr/>

                <SemesterPlan data={userCatalog} user={calendarHeading}/>

            </div>
        </body>
       
    )
};

export default Audit;
