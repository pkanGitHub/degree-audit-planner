import "../styles/audit.css"

const Audit = () => {
    return (
        <div>
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
                </div>
                <div id='degree requirements'>
                    {/* need to make this dynamic for what is chosen above */}
                    <h2>Degree Requirements</h2>
                    {/* https://www.robinwieruch.de/react-dropdown/ */}
                    <h4>General Requirements</h4>
                    <p>Math (5/5)</p>
                    {/* https://www.pluralsight.com/guides/how-to-show-and-hide-reactjs-components */}

                    <div id="requiredCourse">
                        <table>
                            <tr>
                                <th colSpan={2}>Math 1500</th>
                            </tr>
                            <tr>
                                <td>
                                    Credits: 5
                                </td>
                                <td>
                                <select className="requiredCourseSelect">
                                    <option value='taken'>Taken</option>
                                    <option value='IP'>In Progress</option>
                                    <option value='planned'>Planned</option>
                                </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Prerequisites: N/A
                                </td>
                                <td>
                                    <select className="requiredCourseSelect">
                                        <option value='FS2021'>FS2021</option>
                                        <option value='SP2022'>SP2022</option>
                                        <option value='SM2022'>SM2022</option>
                                        <option value='FS2022'>FS2022</option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                       
                    </div>

                </div>
            </div>
        </div>
       
    )
};

export default Audit;