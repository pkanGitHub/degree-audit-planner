import "../styles/audit.css";
import RequiredChoice from "../components/requiredChoice";
import RequiredCourse from "../components/requiredCourse";
import ClassInfo from "../components/classInfoPopup";
import { useEffect, useState, useTransition } from "react";

const Audit = () => {
    const [selectCourseType, setCourseType] = useState('');
    const handleSelect=(e)=>{
        setCourseType(e.target.value)
    }

    const [selectNumber, setNumber] = useState('');
    const handleNumberSelect=(e)=>{
        setNumber(e.target.value)
    }
    const courseNumber = [1400, 1500, 2000, 2050]


    const [selectType, setType] = useState("");
    const typeOptions = ["Major", "Minor", "Certificate"];
    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const [selectCategory, setCategory] = useState("");
    const category = {
        INFOTC: "Information Technology - BS",
        BIOMED: "Biomedical Engineering - BMEBS",
        COMPS: "Computer Science - BS",
    };
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const [selectTerm, setTerm] = useState("");
    const term = {
        FS21: "Fall 2021",
        SP22: "Spring 2022",
        SM22: "Summer 2022",
    };
    const handleTermChange = (e) => {
        setTerm(e.target.value);
    };

    //dynamic categories
    const categories = {MATH: "Math", ENG: "English"}

    //dynamic required courses
    const requiredCourseData = [{classId: "MATH1500", creditHours: 5, preReq: "N/A"}, {classId: "MATH2500", creditHours: 5, preReq: "MATH2500"}, {classId: "ENG3000", creditHours: 3, preReq: "ENG2000"}]

    //dynamic course choice
    const classData = [{classId: "MATH1500", creditHours: 5, preReq: "N/A"}, {classId: "BME1000", creditHours: 3, preReq: "PHYSICS1000"}]

    //delete entry
    //https://stackoverflow.com/questions/61661526/react-delete-one-children-without-rendering-the-parent-again

    //class type select dynamic

    const classSelect = {"INFOTC": "Information Technology", "ENGINR": "Engineering", "CMP_SC": "Computer Science", "MAE": "Mechanical Engineering"}

    const popupClasses = [{className: "INFOTC 1000", classTitle: "Introduction to Information Technology", classDescript: "Introduction to Information Technology introduces the field of Information Technology including foundation experiences and knowledge, the history of digital technologies, emphasis areas in the  program, software engineering, computer networks and the internet, web development, current trends  in technology, career opportunities, and ethical/social issues. Students participate in activities  that introduce students to digital media, digital systems, and software engineering. Students learn to use distributed version control systems and how to work on collaborative teams.", creditHours: "3", preReq: "N/A", lastOffered: "Fall 2023"}, {className: "ENGINR 2011", classTitle: "Engineering Leadership and Strategic Communication", classDescript: "This course is inspired by the experience and writings of CEO and world-renowned leader David Novak. It is designed to introduce engineering students to the concepts, theory, and practice of engineering leadership. Topics include; effective written and oral communications, presentations, engineering leadership characteristics, individual differences and self-awareness, and developing and building teams. Graded on A-F basis only.", creditHours: "3", preReq: "N/A", lastOffered: "Fall 2023"}, {className: "CMP_SC 2270", classTitle: "Introduction to Logic Systems", classDescript: "(same as ECE 2210). Basic tools, methods and procedures to design combinational and sequential digital circuits and systems, including number systems, boolean algebra, logic minimization, circuit design, memory elements, and finite state machine design.", creditHours: "3", preReq: "C or higher in CMP_SC 1050 or INFOTC 1040", lastOffered: "Summer 2021"}, {className: "MAE 2200", classTitle: "Engineering Materials", classDescript: "The nature of the structure of engineering materials. The relationship of material structure to physical properties. Mechanical behavior of engineering materials. Graded on A-F basis only.", creditHours: "3", preReq: "Grade of C- or better in ENGINR 1200 and CHEM 1320. Restricted to Mechanical and Aerospace Engineering students only", lastOffered: "Spring 2022"}];


    // testing add function! this is applied to the mass select, will need to get this to work on the top and other select course

    const [largeClassSelectFields, setLargeFields] = useState([{courseType: "", courseNumber: ""}]) // declares use state that is multiple dictionaries in an array
    const addLargeClassSelectField = () => {
        let newField = {courseType: "", courseNumber: ""} // declares new field as a course type
        setLargeFields([...largeClassSelectFields, newField]) // appends new dictionary field to the array
    }

    const [enrollFields, setEnrollFields] = useState([{type: "", category: "", year: ""}])
    const addEnrollFields = () => {
        let newField = {type: "", category: "", year: ""}
        setEnrollFields([...enrollFields, newField])
    }

    const removeEnrollFields = (index) =>{
        let data = [...enrollFields]
        data.splice(index, 1)
        setEnrollFields(data)
    }


    return (
        <body id="fullpage">
            <div id="header">
                <button id="transcriptButton">Upload Unoffical Transcript</button>
                <input type="file"/>
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
                                        <select name='type' onChange={handleTypeChange}>
                                            {typeOptions.map((typeOptions) => (
                                            <option value={typeOptions}>{typeOptions}</option>))}
                                        </select>
                                    </label>
                                    <label>
                                        Category:
                                        <select name='category' onChange={handleCategoryChange}>
                                            {Object.keys(category).map((key, index) => 
                                            <option value={key}>{category[key]}</option>)}
                                        </select>
                                    </label>
                                    
                                    <label>
                                        Year:
                                        <select name='year' onChange={handleTermChange}>
                                            {Object.keys(term).map((key, index) => 
                                            <option value={key}>{term[key]}</option>)}
                                        </select>
                                    </label>
                                    <button onClick={removeEnrollFields}>Delete</button>
                                </div>
                            )
                        })}
                        <button onClick={addEnrollFields}>Add</button>
                    </div>
                    <hr/>

                    <ul className="accordion">
                        <li>
                            <input type="checkbox" name="accordion" id="first" />
                            <label id="genReqLabel" htmlFor="first">General Requirements</label>
                            <div className="classHistory">
                                <div id="requiredCourses">
                                    {Object.keys(categories).map((key, index)=> (
                                        <div>
                                            <p>{categories[key]}</p>
                                            {requiredCourseData.map((key, index) => <RequiredCourse key={index} classId={key.classId} creditHours={key.creditHours} preReq={key.preReq} />)}
                                        </div>
                                        
                                    ))}
                                </div>

                            </div>
                        </li>
                    </ul>
                    <hr/>
                    <ul className="accordion">
                        <li>
                            <input type="checkbox" name="accordion" id="second" />
                            <label id="genReqLabel" htmlFor="second">General Electives</label>
                            <div className="classHistory">
                                <div id='chooseCourse'>
                                    {classData.map((key, index) => <RequiredChoice key={index} classId={key.classId} creditHours={key.creditHours} preReq={key.preReq} />)}

                                </div>
                            </div>
                        </li>
                    </ul>
                    <hr/>
                    <ul className="accordion">
                        <li>
                            <input type="checkbox" name="accordion" id="third" />
                            <label id='genReqLabel' htmlFor="third">Sample large class select</label>
                            <div className="classHistory">
                                <div id='largeClassSelect'>
                                    
                                    {/* Need to make this where you get the information from thee choose course type and course number and then you submit this to the requiredChoice component */}
                                    
                                    {largeClassSelectFields.map((input, index) => {
                                        return(
                                            <div key={index} id="addedLargeSelection">
                                                <label>
                                                    Course type:
                                                    <select id='chooseCourseType' name="courseType" onChange={handleSelect}>
                                                        {Object.keys(classSelect).map((key, index) => 
                                                        <option value={key}>{classSelect[key]}</option>)}
                                                    </select>
                                                </label>

                                                {/* will want to find a way to pass information through to the pop up, will have to use query based on selection above*/}
                                                {/* https://www.telerik.com/blogs/how-to-programmatically-add-input-fields-react-forms might want this later*/}
                                                <p>
                                                    Choose from {selectCourseType} courses below:
                                                </p>

                                                {popupClasses.filter(item => {
                                                    if (!selectCourseType) return false
                                                    if (item.className.includes(selectCourseType)) {
                                                        return true
                                                    }
                                                }).map(item => (
                                                    <div id="popupDiv">
                                                        <ClassInfo key={item} className={item.className} classTitle={item.classTitle} classDescript={item.classDescript} creditHours={item.creditHours} preReq={item.preReq} lastOffered={item.lastOffered}/>
                                                    </div>
                                                ))
                                                }

                                                
                                

                                                <label>
                                                    Course Number: 
                                                    <select name="courseNumber">
                                                        {courseNumber.map((courseNumber) => (
                                                        <option value={courseNumber}>{courseNumber}</option>))}
                                                    </select>
                                                </label>
                                            </div>
                                        )
                                    })}
                                    <button onClick={addLargeClassSelectField} id='addCourseButton'>Add Course</button>
                                    
                                </div>
                            </div>
                        </li>
                    </ul>

                
                    <hr/>
                    <div id='specifcElective'>

                        <label>
                            Course number:
                            <select id='chooseNumber' name='course'>
                                {courseNumber.map((courseNumber) => (
                                <option value={courseNumber}>{courseNumber}</option>))}
                            </select>
                        </label>

                        <button id='addCourseButton'>Add Course</button>
                        
                    </div>

                    <div id='optionButtons'>
                        <button id='saveButton'>Save</button>
                        <button id='exportButton'>Export</button>
                        <button id='deleteButton'>Delete</button>
                    </div>
                </div>
                <hr/>

                {/* This is all hardcoded, will make it dynamic when we get test data */}
                <div id='planner'>
                    <h2 id='userPlanner'>User's Degree Planner</h2>
                    <table id='twoSemesterPlan'>
                        <tr>
                            <th colSpan={4} id='tableHeading'>Academic Year Test 2020-2021</th>
                        </tr>
                        <tr>
                            <td colSpan={2} className="semesterHeading">
                            Semester 1
                            </td>
                            <td colSpan={2} className="semesterHeading">
                            Semester 2
                            </td>
                        </tr>
                        <tr className="courseTableInfo" id="tableDataHeading">
                            <td>Course name</td>
                            <td>Credit hours</td>
                            <td>Course name</td>
                            <td>Credit hours</td>
                        </tr>
                        <tr className="courseTableInfo">
                            <td>INFOTC 1000</td>
                            <td>3</td>
                            <td>BIO 1500</td>
                            <td>3</td>
                        </tr>
                        <tr className="courseTableInfo">
                            <td>INFOTC 1000</td>
                            <td>3</td>
                            <td>BIO 1500</td>
                            <td>3</td>
                        </tr>
                        <tr className="courseTableInfo">
                            <td>INFOTC 1000</td>
                            <td>3</td>
                            <td>BIO 1500</td>
                            <td>3</td>
                        </tr>
                        <tr className="courseTableInfo">
                            <td>INFOTC 1000</td>
                            <td>3</td>
                            <td>BIO 1500</td>
                            <td>3</td>
                        </tr>
                        <tr id='tableSummary'>
                            <td><b>Status:</b> Complete</td>
                            <td><b>Total Credit Hours:</b> 12</td>
                            <td><b>Status:</b> In Progress</td>
                            <td><b>Total Credit Hours:</b> 12</td>
                        </tr>


                    </table>

                    <table id='threeSemesterPlan'>
                        <tr>
                            <th colSpan={6} id='tableHeading'>Academic Year Test 2021-2022</th>
                        </tr>
                        <tr>
                            <td colSpan={2} className="semesterHeading">
                            Semester 1
                            </td>
                            <td colSpan={2} className="semesterHeading">
                            Semester 2
                            </td>
                            <td colSpan={2} className="semesterHeading">
                            Semester 3
                            </td>
                        </tr>
                        <tr className="courseTableInfo" id="tableDataHeading">
                            <td>Course name</td>
                            <td>Credit hours</td>
                            <td>Course name</td>
                            <td>Credit hours</td>
                            <td>Course name</td>
                            <td>Credit hours</td>
                        </tr>
                        <tr className="courseTableInfo">
                            <td>BIOME 1000</td>
                            <td>3</td>
                            <td>ENGL 1500</td>
                            <td>3</td>
                            <td>MATH 1500</td>
                            <td>3</td>
                        </tr>
                        <tr className="courseTableInfo">
                            <td>BIOME 1000</td>
                            <td>3</td>
                            <td>ENGL 1500</td>
                            <td>3</td>
                            <td>MATH 1500</td>
                            <td>3</td>
                        </tr>
                        <tr className="courseTableInfo">
                            <td>BIOME 1000</td>
                            <td>3</td>
                            <td>ENGL 1500</td>
                            <td>3</td>
                            <td>MATH 1500</td>
                            <td>3</td>
                        </tr>
                        <tr className="courseTableInfo">
                            <td>BIOME 1000</td>
                            <td>3</td>
                            <td>ENGL 1500</td>
                            <td>3</td>
                            <td>MATH 1500</td>
                            <td>3</td>
                        </tr>
                        <tr id='tableSummary'>
                            <td><b>Status:</b> Complete</td>
                            <td><b>Total Credit Hours:</b> 12</td>
                            <td><b>Status:</b> In Progress</td>
                            <td><b>Total Credit Hours:</b> 12</td>
                            <td><b>Status:</b> Planned</td>
                            <td><b>Total Credit Hours:</b> 12</td>
                        </tr>
                    </table>
                </div>
            </div>
        </body>
       
    )
};

export default Audit;
