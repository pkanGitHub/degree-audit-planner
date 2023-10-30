import "../styles/audit.css";
import RequiredChoice from "../components/requiredChoice";
import RequiredCourse from "../components/requiredCourse";
import ClassInfo from "../components/classInfoPopup";
import { useState } from "react";

const Audit = () => {
    const [selectCourseType, setCourseType] = useState('');
    const handleSelect=(e)=>{
        setCourseType(e.target.value)
    }

    const [selectNumber, setNumber] = useState('');
    const handleNumberSelect=(e)=>{
        setNumber(e.target.value)
    }
    const courseNumber = [1000, 2011, 2270, 2271, 2200, 2000, 2201]


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
    const requiredCourseData = [{classId: "MATH 1500", creditHours: 5, preReq: "N/A"}, {classId: "MATH 2500", creditHours: 5, preReq: "MATH 2500"}, {classId: "ENG 3000", creditHours: 3, preReq: "ENG 2000"}]

    //dynamic course choice
    const classData = [{classId: "MATH 1500", creditHours: 5, preReq: "N/A"}, {classId: "BME 1000", creditHours: 3, preReq: "PHYSICS 1000"}]

    //delete entry
    //https://stackoverflow.com/questions/61661526/react-delete-one-children-without-rendering-the-parent-again
    const removeClass = (index) => {
        let data = [...classData]
        data.splice(index, 1)

    }

    //class type select dynamic

    const classSelect = {"INFOTC": "Information Technology", "ENGINR": "Engineering", "CMP_SC": "Computer Science", "MAE": "Mechanical Engineering"}

    const popupClasses = [{className: "INFOTC 1000", classTitle: "Introduction to Information Technology", classDescript: "Introduction to Information Technology introduces the field of Information Technology including foundation experiences and knowledge, the history of digital technologies, emphasis areas in the  program, software engineering, computer networks and the internet, web development, current trends  in technology, career opportunities, and ethical/social issues. Students participate in activities  that introduce students to digital media, digital systems, and software engineering. Students learn to use distributed version control systems and how to work on collaborative teams.", creditHours: "3", preReq: "N/A", lastOffered: "Fall 2023"}, {className: "ENGINR 2011", classTitle: "Engineering Leadership and Strategic Communication", classDescript: "This course is inspired by the experience and writings of CEO and world-renowned leader David Novak. It is designed to introduce engineering students to the concepts, theory, and practice of engineering leadership. Topics include; effective written and oral communications, presentations, engineering leadership characteristics, individual differences and self-awareness, and developing and building teams. Graded on A-F basis only.", creditHours: "3", preReq: "N/A", lastOffered: "Fall 2023"}, {className: "CMP_SC 2270", classTitle: "Introduction to Logic Systems", classDescript: "(same as ECE 2210). Basic tools, methods and procedures to design combinational and sequential digital circuits and systems, including number systems, boolean algebra, logic minimization, circuit design, memory elements, and finite state machine design.", creditHours: "3", preReq: "C or higher in CMP_SC 1050 or INFOTC 1040", lastOffered: "Summer 2021"}, {className: "MAE 2200", classTitle: "Engineering Materials", classDescript: "The nature of the structure of engineering materials. The relationship of material structure to physical properties. Mechanical behavior of engineering materials. Graded on A-F basis only.", creditHours: "3", preReq: "Grade of C- or better in ENGINR 1200 and CHEM 1320.", lastOffered: "Spring 2022"}, {className: "CMP_SC 2271", classTitle: "Introduction to Logic Systems", classDescript: "(same as ECE 2210). Basic tools, methods and procedures to design combinational and sequential digital circuits and systems, including number systems, boolean algebra, logic minimization, circuit design, memory elements, and finite state machine design.", creditHours: "3", preReq: "C or higher in CMP_SC 1050 or INFOTC 1040", lastOffered: "Summer 2021"}, {className: "MAE 2201", classTitle: "Engineering Materials", classDescript: "The nature of the structure of engineering materials. The relationship of material structure to physical properties. Mechanical behavior of engineering materials. Graded on A-F basis only.", creditHours: "3", preReq: "Grade of C- or better in ENGINR 1200 and CHEM 1320.", lastOffered: "Spring 2022"}, {className: "INFOTC 2000", classTitle: "Introduction to Information Technology", classDescript: "Introduction to Information Technology introduces the field of Information Technology including foundation experiences and knowledge, the history of digital technologies, emphasis areas in the  program, software engineering, computer networks and the internet, web development, current trends  in technology, career opportunities, and ethical/social issues. Students participate in activities  that introduce students to digital media, digital systems, and software engineering. Students learn to use distributed version control systems and how to work on collaborative teams.", creditHours: "3", preReq: "N/A", lastOffered: "Fall 2023"}];


    // testing add function! this is applied to the mass select, will need to get this to work on the top and other select course
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

    // on click, add course to top of section to show you have added it
    
    const [selectedCourses, setSelectedCourses] = useState([])
    const handleLargeCourseClick = () => {
        const courseInfo = selectCourseType + " " + selectNumber
        // find course info for selected course type and number in the pop up classes information. this will have to be chanegd when the data base is working, but this is the idea of it all
        {popupClasses.filter(singleClass => singleClass.className.match(courseInfo)).map(filteredClass => (
            
            setSelectedCourses([...selectedCourses, {key: filteredClass, classId: filteredClass.className, creditHours: filteredClass.creditHours, preReq: filteredClass.preReq}])
            
            ))}
        

    }

    const removeCourse = (index) =>{
        let data = [...selectedCourses]
        data.splice(index, 1)
        setSelectedCourses(data)
    }

    const [majorElectCourse, setMajorElectCourse] = useState([])
    const [selectMajorNumber, setMajorNumber] = useState('');
    const handleMajorNumberSelect=(e)=>{
        setMajorNumber(e.target.value)
    }
    const majorCourseNumber = [1000, 2011, 2270, 2271, 2200, 2000, 2201]


    const handleAddMajorElective = () => {
        const courseInfo = "INFOTC " + selectMajorNumber
        {popupClasses.filter(singleClass => singleClass.className.match(courseInfo)).map(filteredClass => (
            
            setMajorElectCourse([...majorElectCourse, {key: filteredClass, classId: filteredClass.className, creditHours: filteredClass.creditHours, preReq: filteredClass.preReq}])
            
            ))}
        

    }

    const removeMajorCourse = (index) =>{
        let data = [...majorElectCourse]
        data.splice(index, 1)
        setMajorElectCourse(data)
    }


    return (
        <body id="fullpage">
            <div id="header">
                {/* https://medium.com/web-dev-survey-from-kyoto/how-to-customize-the-file-upload-button-in-react-b3866a5973d8 */}
                <button id="transcriptButton">Upload Unoffical Transcript</button>
                <input type="file" id="uploadFile"/>
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
                                            <option value=""></option>
                                            {typeOptions.map((typeOptions) => (
                                            <option value={typeOptions}>{typeOptions}</option>))}
                                        </select>
                                    </label>
                                    <label>
                                        Category:
                                        <select name='category' onChange={handleCategoryChange}>
                                            <option value=""></option>
                                            {Object.keys(category).map((key, index) => 
                                            <option value={key}>{category[key]}</option>)}
                                        </select>
                                    </label>
                                    
                                    <label>
                                        Year:
                                        <select name='year' onChange={handleTermChange}>
                                            <option value=""></option>
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
                                    {classData.map((key, index) => <RequiredChoice key={index} classId={key.classId} creditHours={key.creditHours} preReq={key.preReq}/>)}

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
                                    
                              
                                    { selectedCourses.map((key, index) => <RequiredChoice key={index} classId={key.classId} creditHours={key.creditHours} preReq={key.preReq} removeCourse={removeCourse}/>) }

                                   
                                    
                                    <label>
                                        Course type:
                                        <select id='chooseCourseType' name="courseType" onChange={handleSelect}>
                                            <option value=""></option>
                                            {Object.keys(classSelect).map((key, index) => 
                                            <option value={key}>{classSelect[key]}</option>)}
                                        </select>
                                    </label>

                                    {/* will want to find a way to pass information through to the pop up, will have to use query based on selection above*/}
                                    {/* https://www.telerik.com/blogs/how-to-programmatically-add-input-fields-react-forms might want this later*/}
                                    <p>
                                        Choose from {selectCourseType} courses below:
                                    </p>
                                    <div id="popupDiv">

                                        {popupClasses.filter(item => {
                                            if (!selectCourseType) return false
                                            if (item.className.includes(selectCourseType)) {
                                                return true
                                            }
                                        }).map(item => (
                                            <div>
                                                <ClassInfo key={item} className={item.className} classTitle={item.classTitle} classDescript={item.classDescript} creditHours={item.creditHours} preReq={item.preReq} lastOffered={item.lastOffered}/>
                                            </div>
                                        ))
                                        }
                                    </div>


                                    <label>
                                        Course Number: 
                                        <select name="courseNumber" onChange={handleNumberSelect}>
                                            <option value=""></option>
                                            {courseNumber.map((courseNumber) => (
                                            <option value={courseNumber}>{courseNumber}</option>))}
                                        </select>
                                    </label>
                                        
                                  
                                    <button onClick={handleLargeCourseClick} id='addCourseButton'>Add Course</button>

                                    
                                    
                                </div>
                            </div>
                        </li>
                    </ul>

                
                    <hr/>
                    <ul className="accordion">
                        <li>
                            <input type="checkbox" name="accordion" id="fourth" />
                            <label id="genReqLabel" htmlFor="fourth">Major Electives</label>
                            <div className="classHistory">
                                <div id='specifcElective'>

                                    { majorElectCourse.map((key, index) => <RequiredChoice key={index} classId={key.classId} creditHours={key.creditHours} preReq={key.preReq} removeCourse={removeMajorCourse}/>) }
                                    <p>Information Technology electives</p>
                                    <label>
                                        Course number:
                                        <select id='chooseNumber' name='course' onChange={handleMajorNumberSelect}>
                                            <option value=""></option>
                                            {majorCourseNumber.map((majorCourseNumber) => (
                                            <option value={majorCourseNumber}>{majorCourseNumber}</option>))}
                                        </select>
                                    </label>

                                    <button id='addCourseButton' onClick={handleAddMajorElective}>Add Course</button>
                                    
                                </div>
                            </div>

                        </li>
                    </ul>
                    

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
