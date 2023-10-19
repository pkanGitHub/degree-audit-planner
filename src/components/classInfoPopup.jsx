import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../styles/classInfoPopup.css"

//contentStyle={{maxWidth: '100vh', width: '30%', overflowX: "scroll", overflowX: 'scroll', maxHeight: '100vh', margin: 'auto'}}

const ClassInfo = () => {
    const [classes, setClasses] = useState({id: 0, className: "INFOTC 1000", classTitle: " Introduction to Information Technology", description: "Introduction to Information Technology introduces the field of Information Technology including foundation experiences and knowledge, the history of digital technologies, emphasis areas in the  program, software engineering, computer networks and the internet, web development, current trends  in technology, career opportunities, and ethical/social issues. Students participate in activities  that introduce students to digital media, digital systems, and software engineering. Students learn to use distributed version control systems and how to work on collaborative teams.", creditHours: "3", prerequisite: "N/A", lastOffered: "Fall 2023"});
    return(
        <div    
        style={{ height: 200, width: 400, border: '1px solid red', display: 'inline-block' }}    
        className="tooltipBoundary"  
        >
            <Popup contentStyle={{overflowX: "scroll", overflowX: 'scroll', margin: 'auto', height: '30%', width: '30%'}} trigger=
                {<button id='classInfoButton'>{classes.className}</button>} 
                position={'top center'}
                keepTooltipInside=".tooltipBoundary">
                {
                    
        
                    <div className='classInfoPopup'>
                        <h3>{classes.className}: {classes.classTitle}</h3>
                        <p>{classes.description}</p>
                        <p><b>Credit hours:</b> {classes.creditHours}</p>
                        <p><b>Prerequisites:</b> {classes.prerequisite}</p>
                        <p><b>Last offered:</b> {classes.lastOffered}</p>
                    </div>
            
                    
                }
            </Popup>
        </div>
    )
}

export default ClassInfo;