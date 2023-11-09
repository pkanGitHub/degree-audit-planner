import "../styles/audit.css"
import { useState } from "react"
import RequiredCourse from "./requiredCourse";
import "../styles/audit.css"
import AddCourses from "./addCourses";

// this will replace catalog items once Jay updates all types
const MajorTest = ({majors, coursesList}) => {
    const [isOrOpen, setIsOrOpen] = useState(false)
    const toggleOrCourses = () => {
        setIsOrOpen(!isOrOpen)
    }
    return(
            
        majors.filter(option => option.title.match("BA in Biological Sciences")).map((selectedOption, index)=> {if(index===0){return(

            <div key={selectedOption?._id}>
                <h2>{selectedOption?.title}</h2>
                {selectedOption?.requirements && selectedOption.requirements.map((course)=> {if(course.required === "true"){return(
                    <div key={course?._id}>
                        <ul className="accordion">
                            <li>
                            <input type="checkbox" name="accordion" id={course?._id} />
                            <label id="genReqLabel" htmlFor={course?._id}>{course?.label}</label>
                            
                                <div className="classHistory">
                                    <p><b>Credits hours needed:</b> {course.credits}</p>
                            
                                        {course?.list && course.list.map ((item) => {if(item?.or && item.or.length > 0){return(
                                            <div key={item?._id}>
                                    
                                                {coursesList.filter((area) => area.courses.some((course) => course.courseID === item?.id)).map((area)=> area.courses.filter((course) => course.courseID.match(item?.id)).map((selectedCourse, index) => {if(index===0){return(
                                                    <div>
                                                        <div style={{display:"flex"}}>
                                                            <RequiredCourse key={selectedCourse._id} classId={selectedCourse.courseID} creditHours={selectedCourse.credit} preReq={selectedCourse.prerequisites}/>
                                                            <button onClick={toggleOrCourses}>
                                                                {isOrOpen ? '-' : '+'}
                                                            </button>
                                                        </div>
                                                        <div id="orClasses">

                                                            {isOrOpen && item?.or && item.or.map((extra) => (
                                                                <div key={extra}>
                                                                    <p>Or:</p>
                                                                    {coursesList.filter((area) => area.courses.some((course) => course.courseID === extra)).map((area)=> area.courses.filter((course) => course.courseID.match(extra)).map((selectedCourse, index) => {if(index===0){return(
                                                                    
                                                                        <RequiredCourse key={selectedCourse._id} classId={selectedCourse.courseID} creditHours={selectedCourse.credit} preReq={selectedCourse.prerequisites}/>)}
                                                                    else{
                                                                        return null;
                                                                    }}))}
                                                                </div>
                                                            ))}
                                                        </div>
                                                       

                                                    </div>
                                                )}else{
                                                    return null;
                                                }}))}
                                    
                                                
                                                <hr/>
                                            </div>
                                        )}else{
                                            return(
                                                <div key={item?._id}>
                                    
                                                {coursesList.filter((area) => area.courses.some((course) => course.courseID === item?.id)).map((area)=> area.courses.filter((course) => course.courseID.match(item?.id)).map((selectedCourse, index) => {if(index===0){return(
                                                    <div>
                            
                                                        <RequiredCourse key={selectedCourse._id} classId={selectedCourse.courseID} creditHours={selectedCourse.credit} preReq={selectedCourse.prerequisites}/>
                                                       

                                                    </div>
                                                )}else{
                                                    return null;
                                                }}))}
                                
                                                <hr/>
                                            </div>
                                            )
                                        }} 
                                        )}
                                
                                        {course?.info && course.info.map((info) => (
                                            <p key={info?._id}>
                                                <strong>Comment:</strong> {info?.comment}
                                            </p>
                                        ))}
                                
                                    
                                </div>

                            </li>
        
                        </ul>
                    </div>
                )}
                else{
                    let manySelect = []
                    let orClasses = []
                    return(
                        <div key={course?._id}>
                            <ul className="accordion">
                                <li>
                                    <input type="checkbox" name="accordion" id={course?._id} />
                                    <label id="genReqLabel" htmlFor={course?._id}>{course?.label}</label>
                                
                                    <div className="classHistory">
                                        <p><b>Credits hours needed:</b> {course.credits}</p>
                            
                                        <AddCourses courses={manySelect} orCourses={orClasses}/>
                                        
                                            {course?.list && course.list.map ((item) => (
                                                <div key={item?._id}>
                                        
                                                    {coursesList.filter((area) => area.courses.some((course) => course.courseID === item?.id)).map((area)=> area.courses.filter((course) => course.courseID.match(item?.id)).map((selectedCourse, index) => {if(index===0){
                                                        let x = manySelect.push({id: item._id, classId: selectedCourse.courseID, creditHours: selectedCourse.credit, preReq: selectedCourse.prerequisites, description: selectedCourse.description, name: selectedCourse.name, lastOffered: selectedCourse.pastTerms[0]})
                                                        }
                                                        else{
                                                            return null;
                                                        }}))}
                                          
                                        
                                                        {item?.or && item.or.map((extra) => (
                                                            <div key={extra}>
                                                            {coursesList.filter((area) => area.courses.some((course) => course.courseID === extra)).map((area)=> area.courses.filter((course) => course.courseID.match(extra)).map((selectedCourse, index) => {if(index===0){
                                                                let y = orClasses.push({orId: item._id, classId:selectedCourse.courseID, creditHours:selectedCourse.credit, preReq:selectedCourse.prerequisites, description: selectedCourse.description, name: selectedCourse.name, lastOffered: selectedCourse.pastTerms[0]})}
                                                                else{
                                                                    return null;
                                                                }}))}
                                                            </div>
                                                        ))}
                                                
                                                    
                                                </div>
                                            ))}
                                    
                                            {course?.info && course.info.map((info) => (
                                                <p key={info?._id}>
                                                    <strong>Comment:</strong> {info?.comment}
                                                </p>
                                            ))}

                                            
                            
                                        
                                    </div>

                                </li>
            
                            </ul>
                        </div>

                    )
                }})}
               
            </div>
            
 

    )}
    else{
        return null;
    }})
    )
}

export default MajorTest