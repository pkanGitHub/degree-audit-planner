import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../styles/classInfoPopup.css"
import PlanPosition from './planPosition';
import { planYears } from '../lib/user';
import { useState } from 'react';

//tried tooltip, collision, and set boundaries. none of these seem to keep this inside the page. might just do hard coded margin to se eif that will work
//contentStyle={{maxWidth: '100vh', width: '30%', overflowX: "scroll", overflowX: 'scroll', maxHeight: '100vh', margin: 'auto'}}

const ClassInfo = ({ key, className, classTitle, classDescript, creditHours, preReq, lastOffered, fromUser, select}) => {
    const [error, setError] = useState(false);
    const [plan, setPlan] = useState([-1, -1]);
    const setPosition = (year, semester) => {
        if (fromUser) fromUser.setPlan(year, semester);
        setPlan([year, semester])
        setError(false);
    }

    if (!preReq) {
        preReq = "None"
    }

    let notice = "";


    if (!lastOffered) {
        lastOffered = "N/A"
        notice = "Note: This course has no information on when it was last offered. This could be because it has not been offered in years, or records have not been updated about this course. Please contact your advisor about this course if you are interested in enrolling."
    }

    return (
        <Popup contentStyle={{ overflowX: "scroll", overflowY: 'scroll', height: "40%", width: "40%", margin: 'auto', padding: "10px" }} trigger=
            {<button id='classInfoButton'>{className.replace(/-/g, " ")}</button>}
            position={'top center'} keepTooltipInside={true} onOpen={() => select(className)}>
            {
                <div className='classInfoPopup'>
                    <h3>{className}: {classTitle}</h3>
                    <p>{classDescript}</p>
                    <p><b>Credit hours:</b> {creditHours}</p>
                    <p><b>Prerequisites:</b> {preReq}</p>
                    <p><b>Last offered:</b> {lastOffered}</p>
                    <p id='notice'>{notice}</p>
                </div>
            }
        </Popup>

    )
}

export default ClassInfo;