import { useState } from "react";
import ClassInfo from "./classInfoPopup";
import RequiredChoice from "./requiredChoice";
import "../styles/audit.css"
const AddCourses = ({courses, orCourses}) => {

    const totalCourses = []
    {courses.map((course) => totalCourses.push(course))}
    {orCourses.map((course)=> totalCourses.push(course))}
    let sortedTotalCourses = totalCourses.sort(function (a, b) {
        if (a.classId < b.classId) {
          return -1;
        }
        if (a.classId > b.classId) {
          return 1;
        }
        return 0;
      })
    const [userCourses, setUserCourses] = useState([])
    const [course, setCourse] = useState('');
    const sortedCourses = courses.sort(function (a, b) {
        if (a.classId < b.classId) {
          return -1;
        }
        if (a.classId > b.classId) {
          return 1;
        }
        return 0;
      })

    const handleChangeCourse=(e)=>{
        setCourse(e.target.value)
    }


    const handleAddCourse = () => {
        const courseInfo = course
        {totalCourses.filter((course) => course.classId.match(courseInfo)).map((selectedCourse)=> 
            setUserCourses([...userCourses, selectedCourse
            ]))}
        

    }

    const removeCourse = (index) =>{
        let data = [...userCourses]
        data.splice(index, 1)
        setUserCourses(data)
    }

    const [isOrOpen, setIsOrOpen] = useState(false)

    const toggleOrCourses = () => {
        setIsOrOpen(!isOrOpen)
    }

    return(
        <div id='specifcElective'>

            { userCourses.map((key, index) => <RequiredChoice key={index} classId={key.classId} creditHours={key.creditHours} preReq={key.preReq} removeCourse={()=>removeCourse(index)}/>) }

            <p><b>Available Courses:</b></p>

    
            <div id="popupDiv">
                {sortedCourses.map((singleCourse, index) => {if((orCourses.filter(course => course.orId.match(singleCourse.id))).length > 0){
                    return(
                        <div key={singleCourse.id}>
                            <ClassInfo key={index} className={singleCourse.classId} classTitle={singleCourse.name} classDescript={singleCourse.description} creditHours={singleCourse.creditHours} preReq={singleCourse.preReq} lastOffered={singleCourse.lastOffered}/>
                            
                            <button onClick={toggleOrCourses}>
                                {isOrOpen ? '-' : '+'}
                            </button>
        
                    
                                {isOrOpen && orCourses.filter((course) => course.orId.match(singleCourse.id)).map((chosenCourse, index) => 
                            
                                (
                                    <div>
        
                                        <div style={{display: "flex"}}>
                                            <p>or:</p>
                                            <ClassInfo key={index} className={chosenCourse.classId} classTitle={chosenCourse.name} classDescript={chosenCourse.description} creditHours={chosenCourse.creditHours} preReq={chosenCourse.preReq} lastOffered={chosenCourse.lastOffered}/>
                                        </div>
                                    </div>
                                )
                                )}
                        
                        </div>
                        )
                }
                else{
                    return(
                        <div key={singleCourse.id}>
                
                            <ClassInfo key={index} className={singleCourse.classId} classTitle={singleCourse.name} classDescript={singleCourse.description} creditHours={singleCourse.creditHours} preReq={singleCourse.preReq} lastOffered={singleCourse.lastOffered}/>

                        
                        </div>
                    )
                }})}
            </div>
            <label>
                Course number:
                <select id='chooseNumber' name='course' onChange={handleChangeCourse}>
                    <option value=""></option>
                    {sortedTotalCourses.map((key) => (
                    <option value={key.classId}>{key.classId}</option>))}
                </select>
            </label>

            <button id='addCourseButton' onClick={handleAddCourse}>Add Course</button>
            
        </div>
    )
}

export default AddCourses;