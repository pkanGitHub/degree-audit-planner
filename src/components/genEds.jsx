import MassSelectCourse from "./massSelectCourse"
import RequiredCourse from "./requiredCourse" 
import { useState } from "react";
import RequiredChoice from "./requiredChoice";
import ClassInfo from "./classInfoPopup";

const GenEdsModel = ({genEds, coursesList}) => {

    if (!genEds || !coursesList) return;

    return(
        
        genEds.map((genEd) => 
            <div key={genEd?._id}>
                <h2>General Requirements</h2>
                <ul className="accordion">
                    <li>
                        <input type="checkbox" name="accordion" id="genEd" />
                        <label id="genReqLabel" htmlFor="genEd">Academic Year: {genEd?.year}</label>
                        <div className="classHistory">
                            {genEd?.requirements && genEd?.requirements.map((area) => {if((area.label.includes("English")) === true){return(
                                <div key={area?._id}>
                                    <h3>{area?.label}</h3>
                                    <p>Credit hours: {area?.hours}</p>
                                    <p>{area?.info}</p>

                                    {coursesList.filter((area) => area.courses.some((course) => course.courseID === "ENGLSH_1000")).map((area)=> area.courses.filter((course) => course.courseID.match("ENGLSH_1000")).map((selectedCourse, index)=> {if(index === 0 || index === 1){ return(<RequiredCourse key={index} classId={selectedCourse.courseID} creditHours={selectedCourse.credit} preReq={selectedCourse.prerequisites}/>)}}))}

                                    {area?.sub && area.sub.map((subareas)=> {if(subareas?.categories && subareas.categories.length > 0){return(
                                        <div key={subareas?._id}>
                                            <h4>{subareas?.label}</h4>
                                            <p>{subareas?.info}</p>
                                            
                                                
                                            <MassSelectCourse coursesList={coursesList} categories={subareas.categories}/>
                                                
                                        </div>
                                    )}
                                    else{
                                        return(
                                            <div key={subareas?._id}>
                                                <h4>{subareas?.label}</h4>
                                                <p>{subareas?.info}</p>
                                                
                                            </div>
                                        )
                                    }})}
                                
                                
                                </div>
                            )}
                                else if((area.label.includes("Writing Intensive")) === true){return(
                                    <div key={area?._id}>
                                        <h3>{area?.label}</h3>
                                        <p>Credit hours: {area?.hours}</p>
                                        <p>{area?.info}</p>

                                        <MassSelectCourse coursesList={coursesList} categories={["W"]}/>
                                        
                                        {area?.sub && area.sub.map((subareas)=> {if(subareas?.categories && subareas.categories.length > 0){return(
                                            <div key={subareas?._id}>
                                                <h4>{subareas?.label}</h4>
                                                <p>{subareas?.info}</p>
                                                
                                                    
                                                <MassSelectCourse coursesList={coursesList} categories={subareas.categories}/>
                                                    
                                            </div>
                                        )}
                                        else{
                                            return(
                                                <div key={subareas?._id}>
                                                    <h4>{subareas?.label}</h4>
                                                    <p>{subareas?.info}</p>
                                                    
                                                </div>
                                            )
                                        }})}
                                    
                                    
                                    </div>
                                )}
                                else if((area.label.includes("Math and Quantitative Reasoning")) === true){return(
                                    <div key={area?._id}>
                                        <h3>{area?.label}</h3>
                                        <p>Credit hours: {area?.hours}</p>
                                        <p>{area?.info}</p>

                                       <MassSelectCourse coursesList={coursesList} categories={["MQR"]}/>

                                        
                                        {area?.sub && area.sub.map((subareas)=> {if(subareas?.categories && subareas.categories.length > 0){return(
                                            <div key={subareas?._id}>
                                                <h4>{subareas?.label}</h4>
                                                <p>{subareas?.info}</p>
                                                
                                                    
                                                <MassSelectCourse coursesList={coursesList} categories={subareas.categories}/>
                                                    
                                            </div>
                                        )}
                                        else{
                                            return(
                                                <div key={subareas?._id}>
                                                    <h4>{subareas?.label}</h4>
                                                    <p>{subareas?.info}</p>
                                                    
                                                </div>
                                            )
                                        }})}
                                    
                                    
                                    </div>
                                )}
                                else if((area.label.includes("American History or Government")) === true){return(
                                    <div key={area?._id}>
                                        <h3>{area?.label}</h3>
                                        <p>Credit hours: {area?.hours}</p>
                                        <p>{area?.info}</p>

                                       <MassSelectCourse coursesList={coursesList} categories={["MSLR"]}/>

                                        
                                        {area?.sub && area.sub.map((subareas)=> {if(subareas?.categories && subareas.categories.length > 0){return(
                                            <div key={subareas?._id}>
                                                <h4>{subareas?.label}</h4>
                                                <p>{subareas?.info}</p>
                                                
                                                    
                                                <MassSelectCourse coursesList={coursesList} categories={subareas.categories}/>
                                                    
                                            </div>
                                        )}
                                        else{
                                            return(
                                                <div key={subareas?._id}>
                                                    <h4>{subareas?.label}</h4>
                                                    <p>{subareas?.info}</p>
                                                    
                                                </div>
                                            )
                                        }})}
                                    
                                    
                                    </div>
                                )}
                                else {return(
                                    <div key={area?._id}>
                                        <h3>{area?.label}</h3>
                                        <p>Credit hours: {area?.hours}</p>
                                        <p>{area?.info}</p>

                                       <MassSelectCourse coursesList={coursesList} categories={["MQR"]}/>

                                        
                                        {area?.sub && area.sub.map((subareas)=> {if(subareas?.categories && subareas.categories.length > 0){return(
                                            <div key={subareas?._id}>
                                                <h4>{subareas?.label}</h4>
                                                <p>{subareas?.info}</p>
                                                
                                                    
                                                <MassSelectCourse coursesList={coursesList} categories={subareas.categories}/>
                                                    
                                            </div>
                                        )}
                                        else{
                                            return(
                                                <div key={subareas?._id}>
                                                    <h4>{subareas?.label}</h4>
                                                    <p>{subareas?.info}</p>
                                                    
                                                </div>
                                            )
                                        }})}
                                    
                                    
                                    </div>
                                )}
                                
                            }
                            )}
                        </div>
                    </li>
                </ul>
            </div>
        )
                
    )
}

export default GenEdsModel