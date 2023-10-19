import "../styles/audit.css"
import RequiredChoice from "../components/requiredChoice"
import RequiredCourse from "../components/requiredCourse"
import ClassInfo from "../components/classInfoPopup";

const Audit = () => {

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
                        <select name="type">
                            <option value="major">Major</option>
                            <option value="minor">Minor</option>
                            <option value="certificate">Certificate</option>
                        </select>
                    </label>

                    <label>
                        Category:
                        <select name="type">
                            <option value="IT">Information Technology - BS</option>
                            <option value="BIOMED">Biomedical Engineering - BMEBS</option>
                            <option value="CS">Computer Science - BS</option>
                        </select>
                    </label>

                    <label>
                        Catalog Year:
                        <select name="type">
                            <option value="FS2023">Fall 2023</option>
                            <option value="SP2024">Spring 2024</option>
                            <option value="SM2024">Summer 2024</option>
                        </select>
                    </label>
                    <hr/>
                </div>

                <div id="requiredCourses">
                    <h4>General Requirements</h4>
                    <p>Math (5/5)</p>
                    <RequiredCourse/>
                    <RequiredCourse/>
                    <p>English (3/6)</p>
                    <RequiredCourse/>

                </div>
                <hr/>
                <div id='chooseCourse'>
                    <h4>General Electives</h4>
                    <RequiredChoice/>
                    <RequiredChoice/>
                    <RequiredChoice/>
                    <RequiredChoice/>

                </div>

                <div id='largeClassSelect'>
                    <label>
                        Course type:
                        <select id='chooseCourseType'>
                            <option value='BIO'>Biology</option>
                            <option value='AGR'>Agriculture</option>
                            <option value='INT'>International Studies</option>
                            <option value='MCE'>Mechanical Engineering</option>
                        </select>
                    </label>
                    {/* will want to find a way to pass information through to the pop up */}
                    <p>
                        Choose from INFOTC courses below:
                    </p>
                    <div id="popupDiv">
                        <ClassInfo/>
                        <ClassInfo/>
                        <ClassInfo/>
                        <ClassInfo/>
                        <ClassInfo/>
                        <ClassInfo/>
                        <ClassInfo/>
                        <ClassInfo/>
                        <ClassInfo/>
                        <ClassInfo/>
                        <ClassInfo/>
                        <ClassInfo/>
                        <ClassInfo/>
                        <ClassInfo/>
                        <ClassInfo/>
                        <ClassInfo/>
                    </div>

                </div>
            </div>
        </body>
       
    )
};

export default Audit;