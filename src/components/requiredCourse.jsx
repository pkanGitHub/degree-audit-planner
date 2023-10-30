import "../styles/audit.css"

const RequiredCourse = ({key, classId, creditHours, preReq}) => {
    return(
        <div id="requiredCourse">
            <table className="courseTable">
                <tr>
                    <th colSpan={2}>{classId}</th>
                </tr>
                <tr>
                    <td>
                        Credits: {creditHours}
                    </td>
                    <td>
                    <select className="requiredCourseSelect">
                        <option value=""></option>
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

export default RequiredCourse;