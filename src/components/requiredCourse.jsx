import "../styles/audit.css"
import React, { useState } from 'react';

const RequiredCourse = ({classId, creditHours, preReq}) => {
    let options = null;
    const semesters = ["FS2013", "SP2014", "SS2014", "FS2014", "SP2015","SS2015", "FS2015", "SP2016", "SS2016", "FS2016", "SP2017", "SS2017", "FS2017", "SP2018", "SS2018", "FS2018", "SP2019", "SS2019", "FS2019", "SP2020", "SS2020", "FS2020", "SP2021", "SS2021", "FS2021", "SP2022", "SS2022", "FS2022", "SP2023", "SS2023", "FS2023", "SP2024", "SS2024", "FS2024"]
    options = semesters.map((semester) => <option key={semester}>{semester}</option>)
    let toggleOption = null;

    const [style, setStyle] = useState("tablePrereq")
    const [isOpen, setOpen] = useState(false)

    const expand = (e) => {
        if (style !== "tablePrereq") setStyle("tablePrereq");
        else setStyle("expandPrereq");
        setOpen(!isOpen)
    }

    if (!preReq){
        preReq = "None"
    }
    else{
        toggleOption = <button className="prereqButton" onClick={expand}>{isOpen ? "^":"v"}</button>
    }
    return(
        <div id="requiredCourse">
            <table className="courseTable">
                <thead>
                    <tr>
                        <th colSpan={2}>{classId}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <b>Credits: </b>{creditHours}
                        </td>
                        <td>
                            <select className="requiredCourseSelect">
                                <option value="">Status</option>
                                <option value='taken'>Taken</option>
                                <option value='IP'>In Progress</option>
                                <option value='planned'>Planned</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="preReqTD">
                                <div className={style}><b>Prerequisities:</b> {preReq}</div> {toggleOption}
                            </div>
                            
                            
                        </td>
                        <td>
                            <select className="requiredCourseSelect">
                                <option value="">Term</option>
                                { options }
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            
        </div>
    )
}

export default RequiredCourse;