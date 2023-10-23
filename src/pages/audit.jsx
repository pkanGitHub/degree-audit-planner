import "../styles/audit.css"
import RequiredChoice from "../components/requiredChoice"
import RequiredCourse from "../components/requiredCourse"
import ClassInfo from "../components/classInfoPopup";
import { useState } from "react";
import { type } from "@testing-library/user-event/dist/type";

const Audit = () => {
    const [selectCourseType, setCourseType] = useState('');
    const handleSelect=(e)=>{
        setCourseType(e.target.value)
    }

    // this makes the selection dynamic and allows other options to be passed through, used specifically for database data and flexibility
    const [selectType, setType] = useState('');
    const typeOptions = ['Major', 'Minor', 'Certificate']
    const handleTypeChange = (e) => {
        setType(e.target.value)
    }
    const [selectCategory, setCategory] = useState('');
    const category = {INFOTC: "Information Technology - BS", BIOMED: "Biomedical Engineering - BMEBS", COMPS: "Computer Science - BS"}
    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }

    const [selectTerm, setTerm] = useState('');
    const term = {FS21: "Fall 2021", SP22: "Spring 2022", SM22: "Summer 2022"}
    const handleTermChange = (e) => {
        setTerm(e.target.value)
    }

    //dynamic categories
    const categories = {MATH: "Math", ENG: "English"}

    //dynamic required courses
    const requiredCourseData = [{classId: "MATH1500", creditHours: 5, preReq: "N/A"}, {classId: "MATH2500", creditHours: 5, preReq: "MATH2500"}, {classId: "ENG3000", creditHours: 3, preReq: "ENG2000"}]

    //dynamic course choice
    const classData = [{classId: "MATH1500", creditHours: 5, preReq: "N/A"}, {classId: "BME1000", creditHours: 3, preReq: "PHYSICS1000"}]

    //delete entry
    //https://stackoverflow.com/questions/61661526/react-delete-one-children-without-rendering-the-parent-again

    //class type select dynamic

    const classSelect = {BIO: "Biology", AGR: "Agriculture", INT: "International Studies", MECHE: "Mechanical Engineering"}

    const popupClasses = [{className: "INFOTC 1000", classTitle: " Introduction to Information Technology", classDescript: "Introduction to Information Technology introduces the field of Information Technology including foundation experiences and knowledge, the history of digital technologies, emphasis areas in the  program, software engineering, computer networks and the internet, web development, current trends  in technology, career opportunities, and ethical/social issues. Students participate in activities  that introduce students to digital media, digital systems, and software engineering. Students learn to use distributed version control systems and how to work on collaborative teams.", creditHours: "3", preReq: "N/A", lastOffered: "Fall 2023"}, {className: "ENGINR 2011", classTitle: "Engineering Leadership and Strategic Communication", classDescript: "This course is inspired by the experience and writings of CEO and world-renowned leader David Novak. It is designed to introduce engineering students to the concepts, theory, and practice of engineering leadership. Topics include; effective written and oral communications, presentations, engineering leadership characteristics, individual differences and self-awareness, and developing and building teams. Graded on A-F basis only.", creditHours: "3", preReq: "N/A", lastOffered: "Fall 2023"}];
  
    return (
        <body id="fullpage">
            <div>
                <button className="transcriptButton">Upload Unoffical Transcript</button>
                <br/>
                <a href="/tutorial">Need Help?</a>
            </div>
            <div id="audit">
                <div id='enrollmentSelection'>
                    {/* https://www.youtube.com/watch?v=XtS14dXwvwE */}
                    <label>
                        Type:
                        <select name="type" onChange={handleTypeChange}>
                            {typeOptions.map((typeOptions) => (
                                <option value={typeOptions}>{typeOptions}</option>))}
                        </select>
                    </label>

                    <label>
                        Category:
                        <select name="type" onChange={handleCategoryChange}>
                            {Object.keys(category).map((key, index) => 
                            <option value={key}>{category[key]}</option>)}
                        </select>
                    </label>

                    <label>
                        Catalog Year:
                        <select name="type" onChange={handleTermChange}>
                            {Object.keys(term).map((key, index) => 
                            <option value={key}>{term[key]}</option>)}
                        </select>
                    </label>
                    <hr/>
                </div>

                <div id="requiredCourses">
                    <h4>General Requirements</h4>
                    {Object.keys(categories).map((key, index)=> (
                        <div>
                            <p>{categories[key]}</p>
                            {requiredCourseData.map((key, index) => <RequiredCourse key={index} classId={key.classId} creditHours={key.creditHours} preReq={key.preReq} />)}
                        </div>
                        
                    ))}

                </div>
                <hr/>
                <div id='chooseCourse'>
                    <h4>General Electives</h4>
                    {classData.map((key, index) => <RequiredChoice key={index} classId={key.classId} creditHours={key.creditHours} preReq={key.preReq} />)}

                </div>

                <div id='largeClassSelect'>
                    <label>
                        Course type:
                        <select id='chooseCourseType' onChange={handleSelect}>
                            {Object.keys(classSelect).map((key, index) => 
                            <option value={key}>{classSelect[key]}</option>)}
                        </select>
                    </label>
                    {/* will want to find a way to pass information through to the pop up, will have to use query based on selection above*/}
                    <p>
                        Choose from {selectCourseType} courses below:
                    </p>
                    <div id="popupDiv">
                        {popupClasses.map((key, index) => <ClassInfo key={index} className={key.className} classTitle={key.classTitle} classDescript={key.classDescript} creditHours={key.creditHours} preReq={key.preReq} lastOffered={key.lastOffered}/>)}
                    </div>

                </div>
            </div>
        </body>
       
    )
};

export default Audit;