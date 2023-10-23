// this is for courses that are like major electives where you get to choose from a very select set of courses
import "../styles/audit.css"


const RequiredChoice = ({key, classId, creditHours, preReq, removeClass}) => {

    return (
        <div id="choiceCourse">
            <table>
                
                <tr>
                    <th>{classId}</th>
                    <th id="removeItem"><button id="removeButton">X</button></th>
                </tr>

             
                
                <tr>
                    <td>
                        Credits: {creditHours}
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
                        Prerequisites: {preReq}
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
    )
}

export default RequiredChoice;