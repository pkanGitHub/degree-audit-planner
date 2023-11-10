import { useState } from "react";
import RequiredChoice from "./requiredChoice";

const TransferCourse = () => {
    const [userCourses, setUserCourses] = useState([])
   

    const [courseName, setCourseName] = useState('')
    const [creditHour, setCreditHour] = useState('')

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    const addedCourses = []


    // const handleAddCourse = () => {
    //     const courseInfo = course
    //     {addedCourses.filter((course) => course.courseID.match(courseInfo)).map((selectedCourse)=> 
    //         setUserCourses([...userCourses, selectedCourse
    //         ]))}
        

    // }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
      }

    const removeCourse = (index) =>{
        let data = [...userCourses]
        data.splice(index, 1)
        setUserCourses(data)
    }

    return(
       
        <div id='specifcElective'>
            

            { userCourses.map((key, index) => <RequiredChoice key={index} classId={key.courseID} creditHours={key.credit} preReq={"Transfer course"} removeCourse={()=>removeCourse(index)}/>) }

            <form onSubmit={handleSubmit}>
                <label>
                    Course ID:
                    <input type="text" value={courseName} onChange={handleChange}/>
                </label>

                
                <label>
                    Credit Hours:
                    <input type="text" value={creditHour} onChange={handleChange}/>
                </label>

                <input type="submit" id="addCourseButton"/>
            </form>

            {/* <button id='addCourseButton' onClick={handleAddCourse}>Add Course</button> */}
            
        </div>
               
    )
}
export default TransferCourse;