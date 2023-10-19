import "../styles/audit.css"

const RequiredCourse = () => {
    return(
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
    )
}

export default RequiredCourse;