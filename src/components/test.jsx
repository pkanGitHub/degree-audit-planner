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
            
        majors.filter(option => option.title.match("BS in Information Technology")).map((selectedOption, index)=> {if(index===0){return(
            // this first if basically says take the first filtered option. did this because would grab names that match but have extra. for example, minor in social justice would also return minor in social justice for educators
            <div key={selectedOption?._id}>
                <h2>{selectedOption?.title}</h2>
                {selectedOption?.requirements && selectedOption.requirements.map((course)=> {if(course.required === "true"){return(
                    // this section if filters based on if the course section is required or not, if not, will do a mass select type of thing
                    <div key={course?._id}>
                        <ul className="accordion">
                            <li>
                            <input type="checkbox" name="accordion" id={course?._id} />
                            <label id="genReqLabel" htmlFor={course?._id}>{course?.label}</label>
                            
                                <div className="classHistory">
                                    <p><b>Credits hours needed:</b> {course.credits}</p>
                            
                                        {course?.list && course.list.map ((item) => {if(item?.or && item.or.length > 0){return(
                                            // this if statement filters based on whether or not the specific class has an OR class. if it does, returns all of this information. if it doesn't then only returns specific class
                                            <div key={item?._id}>
                                    
                                                {coursesList.filter((area) => area.courses.some((course) => course.courseID === item?.id)).map((area)=> area.courses.filter((course) => course.courseID.match(item?.id)).map((selectedCourse, index) => {if(index===0){return(
                                                    // this return does the same that the top filter does but with courses. for example: filtering BIO 1000 would also get BIO 1000H or BIO 1000W or any other combination. to get the only match necessary, need only thee first return. if you want the other courses, searching for them specifically works fine
                                                    <div style={{display:"flex"}}>
                                                        <div style={{display:"flex"}}>
                                                            <RequiredCourse key={selectedCourse._id} classId={selectedCourse.courseID} creditHours={selectedCourse.credit} preReq={selectedCourse.prerequisites}/>
                                                            {/* this button acts as an open close type of function */}
                                                            <button onClick={toggleOrCourses}>
                                                                {isOrOpen ? 'Hide' : 'Other Courses'}
                                                            </button>
                                                        

                                                            {isOrOpen && item?.or && item.or.map((extra) => (
                                                                <div key={extra}>
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
                    // this section is for courses that are not required but need a sort of user input to add the courses to the degree accordingly
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