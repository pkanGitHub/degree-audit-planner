import "../styles/audit.css";
import CatalogItems from "../components/catalog";
import { useState, useEffect } from "react";
import GenEdsModel from "../components/genEds";
import ExtraCourses from "../components/extraCourses";
import TransferCourse from "../components/transferCourses";
import SemesterPlan from "../components/semesterplan";
import { getCerts, getCourseList, getGenEds, getMajors, getMinors } from "../lib/data";
import TranscriptUpload from "../components/transcriptUpload";

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

    return (
        <body id="fullpage">
            <div id="header">
                <TranscriptUpload set={addCatalog}/>
                <br/>
                <a href="/tutorial" target="_blank">Need Help?</a>
            </div>
            <div id='contents'>
            
                <div id="audit">

                    <div id="enrollmentSelection">
                        {/* https://www.youtube.com/watch?v=XtS14dXwvwE */}
                        {enrollFields.map((input, index) => {
                            return(
                                <div key={index} id="addedSectionEnroll">
                                    <label>
                                        Type:
                                        <select name='type' value={input.type} onChange={(e) => {handleTypeChange(e); handleEnrollFieldChange(index, e)}}>
                                            <option value="default"></option>
                                            <option value="majors">Major</option>
                                            <option value="minors">Minor</option>
                                            <option value="certificates">Certificate</option>
                                        </select>
                                    </label>
                                    <label>
                                        Category:
                                        <select name='category' value={input.category} onChange={(e)=> {handleCategoryChange(e); handleEnrollFieldChange(index, e)}}>
                                            <option value="default"></option>
                                            { options }
                                        </select>
                                    </label>
                                    
                                    <label>
                                        Year:
                                        <select name='year' value={input.year} onChange={(e)=>{handleTermChange(e); handleEnrollFieldChange(index, e)}}>
                                            <option value="default"></option>
                                            {Object.keys(term).map((key, index) => 
                                            <option value={key}>{term[key]}</option>)}
                                        </select>
                                    </label>
                                    {/* <button onClick={()=>removeEnrollFields(index)}>Delete</button> */}
                                </div>
                            )
                        })}
                        <button onClick={handleUserCategories}>Add Program</button>
                    </div>
                    <hr/>
                    
                    <GenEdsModel genEds={genEds} coursesList={coursesList}/>

            
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

                                    <ExtraCourses coursesList={coursesList}/>
                                </div>
                            </li>
                        </ul>

                        <ul className="accordion">
                            <li>
                                <input type="checkbox" name="accordion" id="transfer" />
                                <label id="genReqLabel" htmlFor="transfer">Transfer Courses:</label>
                                <div className="classHistory">

                                    <TransferCourse/>
                                </div>
                            </li>
                        </ul>

                    </div>


                    <div id='optionButtons'>
                        <button id='saveButton'>Save</button>
                        <button id='exportButton'>Export</button>
                        <button id='deleteButton'>Delete</button>
                    </div>
                </div>
                <hr/>

                <SemesterPlan data={userCatalog}/>

            </div>
        </body>
       
    )
};

export default Audit;
