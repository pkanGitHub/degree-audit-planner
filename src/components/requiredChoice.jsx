// this is for courses that are like major electives where you get to choose from a very select set of courses
import Popup from "reactjs-popup";
import "../styles/audit.css"
import { useState, useEffect } from "react";
import PlanPosition from "./planPosition";
import { planYears } from "../lib/user"


const RequiredChoice = ({key, classId, creditHours, preReq, removeCourse, course, update}) => {
    let options = null;
    // const semesters = ["FS2013", "SP2014", "SS2014", "FS2014", "SP2015","SS2015", "FS2015", "SP2016", "SS2016", "FS2016", "SP2017", "SS2017", "FS2017", "SP2018", "SS2018", "FS2018", "SP2019", "SS2019", "FS2019", "SP2020", "SS2020", "FS2020", "SP2021", "SS2021", "FS2021", "SP2022", "SS2022", "FS2022", "SP2023", "SS2023", "FS2023", "SP2024", "SS2024", "FS2024"]
    // options = semesters.map((semester) => <option key={semester}>{semester}</option>)
    // options = ["Fall", "Summer", "Spring"];
    // options = options.map(semester =>  <option key={semester}>{semester}</option>)

    let toggleOption = null;

    const [style, setStyle] = useState("tablePrereq")
    const [isOpen, setOpen] = useState(false)

    const expand = (e) => {
        if (style !== "tablePrereq") setStyle("tablePrereq");
        else setStyle("expandPrereq");
        setOpen(!isOpen)
    }

    const [plan, setPlan] = useState([-1, -1]);
    const setPosition = (year, semester) => {
        course.setPlan(year, semester);
        setPlan(year, semester);
        update();
    }

    
    // const setPosition = (year, semester) => {
    //     if (fromUser) fromUser.setPlan(year, semester);
    //     setPlan([year, semester])
    //     setError(false);
    // }

    const statusChanged = event => {
        console.log(event.target.value);
        switch(event.target.value) {
            case "completed": course.completed(); break;
            case "IP": course.inProgress(); break;
            case "planned": course.planned(); break;
            default: break;
        }
        update();
    }


    if (!preReq){
        preReq = "None"
    }
    else{
        toggleOption = <button className="prereqButton" onClick={expand}>{isOpen ? "^":"v"}</button>
    }
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
                    <select className="requiredCourseSelect" name="progressSelect" onChange={statusChanged}>
                        <option value="">Status</option>
                        <option value='completed'>Completed</option>
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
                        {/* <select className="requiredCourseSelect" name="semesterSelect" >
                            <option value="">Term</option>
                            { options }
                        </select> */}
                        <Popup contentStyle={{ height: "fit-content", width: "fit-content", margin: 'auto', padding: "10px" }} trigger=
                        {<button id='classInfoButton'>Term</button>}
                        position={'top center'} keepTooltipInside={true} >
                            <PlanPosition years={planYears()} plan={course?.plan || plan} set={setPosition} />
                        </Popup>
                    </td>
                </tr>
            </table>
            
        </div>
    )
}

export default RequiredChoice;