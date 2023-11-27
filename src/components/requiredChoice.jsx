// this is for courses that are like major electives where you get to choose from a very select set of courses
import "../styles/audit.css"


const RequiredChoice = ({key, classId, creditHours, preReq, removeCourse}) => {
    return (
        <div id="choiceCourse">
            <table className="courseTable" value={key}>
                
                <tr>
                    <th>{classId}</th>
                    <th id="removeItem" onClick={removeCourse}><button id="removeButton">X</button></th>
                </tr>

             
                
                <tr>
                    <td>
                        <b>Credits:</b> {creditHours}
                    </td>
                    <td>
                    <select className="requiredCourseSelect" name="progressSelect">
                        <option value=""></option>
                        <option value='taken'>Taken</option>
                        <option value='IP'>In Progress</option>
                        <option value='planned'>Planned</option>
                    </select>
                    </td>
                </tr>
            
                
                <tr>
                    <td>
                        <b>Prerequisities:</b> {preReq}
                    </td>
                    <td>
                        <select className="requiredCourseSelect" name="semesterSelect" >
                            <option value=""></option>
                            <option value='FS2021'>FS2021</option>
                            <option value='SP2022'>SP2022</option>
                            <option value='SM2022'>SM2022</option>
                            <option value='FS2022'>FS2022</option>
                        </select>
                    </td>
                </tr>
            </table>
            
        </div>
    )
}

export default RequiredChoice;