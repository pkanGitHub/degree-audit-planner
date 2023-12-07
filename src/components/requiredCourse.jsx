import Popup from "reactjs-popup";
import "../styles/audit.css"
import React, { useState } from 'react';
import PlanPosition from "./planPosition";
import { addCourse, planYears } from "../lib/user";
import { Course } from "../lib/course";
import { UpOutlined, DownOutlined } from "@ant-design/icons"; 


const RequiredCourse = ({ classId, creditHours, preReq, userCourses, update }) => {
    let toggleOption = null;
    const [style, setStyle] = useState("tablePrereq")
    const [isOpen, setOpen] = useState(false)

    const expand = (e) => {
        if (style !== "tablePrereq") setStyle("tablePrereq");
        else setStyle("expandPrereq");
        setOpen(!isOpen)
    }

    var course = userCourses.find(course => course.id?.toLowerCase() === classId?.toLowerCase());

    const [plan, setPlan] = useState([-1, -1]);
    const setPosition = (year, semester) => {
        if (!course) {
            course = new Course(classId, year, semester, creditHours)
            course.setPlan(year, semester);
            addCourse(course);
        }
        else course.setPlan(year, semester);
        
        setPlan(year, semester);
        update();
    }

    const statusChanged = event => {
        const switchStatement = (val) => {
            switch(val) {
                case "completed": course.completed(); break;
                case "in-progress": course.inProgress(); break;
                case "planned": course.planned(); break;
                default: break;
            }
        }

        if (!course) {
            course = new Course(classId, plan[0], plan[1], creditHours)
            switchStatement(event.target.value);
            addCourse(course);
        }
        else switchStatement(event.target.value);
        
        update();
    }

    if (!preReq) {
        preReq = "None"
    }
    else {
        toggleOption = <button className="prereqButton" onClick={expand}>{isOpen ? <UpOutlined /> : <DownOutlined />}</button>
    }
    return (
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
                            <select className="requiredCourseSelect" name="progressSelect" onChange={statusChanged} value={course?.status || ""}>
                                <option value="">Status</option>
                                <option value='completed'>Completed</option>
                                <option value='in-progress'>In Progress</option>
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
                            <Popup contentStyle={{ height: "fit-content", width: "fit-content", margin: 'auto', padding: "10px" }} trigger=
                                {<button id='classInfoButton'>Term</button>}
                                position={'top center'} keepTooltipInside={true} >
                                <PlanPosition years={planYears()} plan={course?.plan || plan} set={setPosition} />
                            </Popup>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default RequiredCourse;