import "../styles/audit.css"
import React, { useState, useEffect } from "react";
import RequiredCourse from "./requiredCourse";
import "../styles/audit.css"
import AddCourses from "./addCourses";
//import { userRequirments } from "./catalog";



const CatalogItems = ({type, category, coursesList, removeCatalog}) => {
    const [isOrOpen, setIsOrOpen] = useState(false)

    const [totalRequiredCredits, setTotalRequiredCredits] = useState(0);
    const [userRequirments, setUserRequirments] = useState([])
  
    //need to add create user requirements to the use effect
    useEffect(() => {
        createUserRequirments()
        calculateTotalRequiredCredits()
    }, [type, category, coursesList]); 
    
    const toggleOrCourses = () => {
        setIsOrOpen(!isOrOpen)
    }

    const createUserRequirments = () => {
        let userRequirments = []
        type.filter(option => option.title.match(category)).map((selectedOption, index) => {
            if (index === 0) {
                selectedOption?.requirements && selectedOption.requirements.map((course) => {
                    if (course.required === "true" && course.list.lenght !== 0 && course.label !== "Internship" && course.label !== "# Internship") {
                        //i need to add this information to the user requirements array
                        userRequirments.push(
                            { id: course._id, label: course.label, credits: course.credits, list: course.list, userCreditsTitle: course.label, userCredits: 2 })
                    }
                    else {
                        return null;
                    }
                })
               
            }
            setUserRequirments(userRequirments)
        })
    }



                
    const calculateTotalRequiredCredits = () => {
        let totalCredits = 0;
    
        type
            .filter((option) => option.title.match(category))
            .forEach((selectedOption) => {
                selectedOption?.requirements &&
                    selectedOption.requirements.forEach((course) => {
                        if (course?.label === "Total Minimum") 
                        {
                            const credits = parseInt(course?.credits, 10) || 0;
                            totalCredits += credits;
                        }
                    });
            });
    
        setTotalRequiredCredits(totalCredits);
    };



    return(
        type.filter(option => option.title.match(category)).map((selectedOption, index)=> {if(index===0){return(
            // this first if basically says take the first filtered option. did this because would grab names that match but have extra. for example, minor in social justice would also return minor in social justice for educators
            <div key={selectedOption?._id}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h2>{selectedOption?.title}- Required Credits:{" "} {totalRequiredCredits}</h2>
                    <button className="programDelete" onClick={removeCatalog}>Delete</button>
                </div>
                
                {selectedOption?.requirements && selectedOption.requirements.map((course)=> {                   
                    if(course.required === "true" && course.list.lenght !== 0 && course.label !== "Internship" && course.label !== "# Internship"){
                        return(
                    // this section if filters based on if the course section is required or not, if not, will do a mass select type of thing
                    <div key={course?._id}>
                        <ul className="accordion">
                            <li>
                            <input type="checkbox" name="accordion" id={course?._id} />
                            <label id="genReqLabel" htmlFor={course?._id}><u>{course?.label}</u> - (Required Credit Hours: {course?.credits})  (Credits Taken:  {userRequirments?.userCredits}) (Credits Selected: {userRequirments?.userCredits} )</label>
                            
                                <div className="classHistory">
                                    {/* <p><b>Credits hours needed:</b> {course.credits}</p> */}
                            
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
                // else if(course.list.length !== 0){
                else{
                    const UnNeededTitlesArray = [
                        "Graduate Level Coursework",
                        "General Education",
                        "Free Elective",
                        "Total Minimum"
                      ];
                    if(course.list.length === 0 || course.label === "Internship" || course.label === "# Internship"){
                        if(!UnNeededTitlesArray.includes(course.label)){
                        return(
                            <ul>
                                <p className="accordion" htmlFor={course?._id}><u>{course?.label}</u> - Required Credit Hours: {course?.credits}</p>
                            </ul>
                        )
                        }
                    }
                    else{
                    let manySelect = []
                    let orClasses = []
                    return(
                        <div key={course?._id}>
                            <ul className="accordion">
                                <li>
                                    <input type="checkbox" name="accordion" id={course?._id} />
                                    <label id="genReqLabel" htmlFor={course?._id}><u>{course?.label}</u> - Required Credit Hours: {course?.credits}</label>
                                
                                    <div className="classHistory">
                                        {/* <p><b>Credits hours needed:</b> {course.credits}</p> */}
                            
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

                    )}
                }})}
               
            </div>

        )}
            else{
                return null;
        }})
    )

}

export default CatalogItems