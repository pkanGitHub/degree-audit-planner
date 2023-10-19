import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../styles/classInfoPopup.css"

//tried tooltip, collision, and set boundaries. none of these seem to keep this inside the page. might just do hard coded margin to se eif that will work
//contentStyle={{maxWidth: '100vh', width: '30%', overflowX: "scroll", overflowX: 'scroll', maxHeight: '100vh', margin: 'auto'}}

const ClassInfo = () => {
    const [classes, setClasses] = useState({id: 0, className: "INFOTC 1000", classTitle: " Introduction to Information Technology", description: "Introduction to Information Technology introduces the field of Information Technology including foundation experiences and knowledge, the history of digital technologies, emphasis areas in the  program, software engineering, computer networks and the internet, web development, current trends  in technology, career opportunities, and ethical/social issues. Students participate in activities  that introduce students to digital media, digital systems, and software engineering. Students learn to use distributed version control systems and how to work on collaborative teams.", creditHours: "3", prerequisite: "N/A", lastOffered: "Fall 2023"});
    return(
        <Popup contentStyle={{overflowX: "scroll", overflowY: 'scroll', height: "40%", width: "40%", margin: 'auto', padding: "10px"}} trigger=
            {<button id='classInfoButton'>{classes.className}</button>} 
            position={'top center'}>
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
        
    )
}

export default ClassInfo;