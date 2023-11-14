import "../styles/audit.css"
import React, { useState } from 'react';

const RequiredCourse = ({key, classId, creditHours, preReq}) => {
    const [allCourses, setAllCourses] = useState([])
    //setAllCourses([...allCourses, requiredCourseData])
    // get values here
    // https://www.geeksforgeeks.org/how-to-pass-data-from-child-component-to-its-parent-in-reactjs/

    return(
        <div id="requiredCourse">
            <table className="courseTable">
                <tr>
                    <th colSpan={2}>{classId}</th>
                </tr>
                <tr>
                    <td>
                        <b>Credits: </b>{creditHours}
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
                        <b>Prerequisites: </b>{preReq}
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