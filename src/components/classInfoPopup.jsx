import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../styles/classInfoPopup.css"

//tried tooltip, collision, and set boundaries. none of these seem to keep this inside the page. might just do hard coded margin to se eif that will work
//contentStyle={{maxWidth: '100vh', width: '30%', overflowX: "scroll", overflowX: 'scroll', maxHeight: '100vh', margin: 'auto'}}

const ClassInfo = ({key, className, classTitle, classDescript, creditHours, preReq, lastOffered}) => {
    if (!preReq){
        preReq = "None"
    }
    
    return(
        <Popup contentStyle={{overflowX: "scroll", overflowY: 'scroll', height: "40%", width: "40%", margin: 'auto', padding: "10px"}} trigger=
            {<button id='classInfoButton'>{className}</button>} 
            position={'top center'} keepTooltipInside={true}>
            {
    
                <div className='classInfoPopup'>
                    <h3>{className}: {classTitle}</h3>
                    <p>{classDescript}</p>
                    <p><b>Credit hours:</b> {creditHours}</p>
                    <p><b>Prerequisites:</b> {preReq}</p>
                    <p><b>Last offered:</b> {lastOffered}</p>
                </div>
        
                
            }
        </Popup>
        
    )
}

export default ClassInfo;