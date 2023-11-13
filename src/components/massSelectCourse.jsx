import { useState } from "react";
import "../styles/audit.css";
import ClassInfo from "./classInfoPopup";
import RequiredChoice from "./requiredChoice";
import { get } from "mongoose";

const MassSelectCourse = ({coursesList, categories}) => {
    const [selectCourseType, setCourseType] = useState('');
    const handleSelect=(e)=>{
        setCourseType(e.target.value)
    }

    const [selectCourse, setSelectCourse] = useState('');
    const handleCourseSelect=(e)=>{
        setSelectCourse(e.target.value)
    }
    const [selectedCourses, setSelectedCourses] = useState([])
    const handleLargeCourseClick = () => {
        const courseInfo = selectCourse
       
        {getOptions.filter(singleClass => singleClass.courseID.match(courseInfo)).map(filteredClass => (
            
            setSelectedCourses([...selectedCourses, {key: filteredClass._id, classId: filteredClass.courseID, creditHours: filteredClass.credit, preReq: filteredClass.prerequisites}])
            
            ))}
        

    }

    const removeCourse = (index) =>{
        let data = [...selectedCourses]
        data.splice(index, 1)
        setSelectedCourses(data)
    }

    const categorySelect = [{id: "BISC", name: "Biological Science"}, {id: "PHSC", name: 'Physical Science'}, {id: "MSCI", name: "Mathematical Science"}, {id: "BSCI", name: "Behavioral Science"}, {id: "SSCI", name: "Social Science"}, {id: "HUM", name:"Humanities"}, {id: "GLAB", name: "Labratory Course"}, {id: "W", name: "Writing Intensive"}, {id: "MQR", name: "Math Requirement"}, {id: "MSLR", name: "MO State Law Course"}]
    const filteredCategory = []

    categories.map(singleCategory => categorySelect.filter(category => category.id.match(singleCategory)).map(sortedCategory => filteredCategory.push({id: sortedCategory.id, name: sortedCategory.name})))


    let courseOptions = null;
    let getOptions = []
    if(selectCourseType === "W"){
        coursesList.filter((area) => area.courses.some((course) => course?.courseID && course.courseID.endsWith("W"))).map((area)=> area.courses.filter((course) => course.courseID.endsWith("W")).map((selectedCourse) => getOptions.push(selectedCourse)))
        courseOptions = getOptions.map((option) => <option key={option?.courseID}>{option?.courseID}</option>)
    }
    else{
        coursesList.map(area => area.courses.filter(course => course?.categories && course.categories.some(category => category === selectCourseType)).map(course => getOptions.push(course)))
        courseOptions = getOptions.map((option) => <option key={option?.courseID}>{option?.courseID}</option>)

    }


    return(
        
        <div id='largeClassSelect'>
            
        
            { selectedCourses.map((key, index) => <RequiredChoice key={index} classId={key.classId} creditHours={key.creditHours} preReq={key.preReq} removeCourse={removeCourse}/>) }
            
            <label>
                Course type:&nbsp;&nbsp;
                <select id='chooseCourseType' name="courseType" onChange={handleSelect}>
                    <option value=""></option>
                    {filteredCategory.map((key) => 
                    <option value={key.id}>{key.name}</option>)}
                </select>
            </label>

            <p>
                Choose from {selectCourseType} courses below:
            </p>
            <div id="popupDiv">

                {getOptions.map(item => (
                    <div>
                        <ClassInfo key={item._id} className={item.courseID} classTitle={item.name} classDescript={item.description} creditHours={item.credit} preReq={item.prerequisites} lastOffered={item.pastTerms[0]}/>
                    </div>
                ))
                }
            </div>


            <label>
                Course Options:&nbsp;&nbsp;
                <select name="courseName" onChange={handleCourseSelect}>
                    <option value=""></option>
                    { courseOptions }
                </select>
            </label>
                
            
            <button onClick={handleLargeCourseClick} id='addCourseButton'>Add Course</button>

            
        </div>
                
    )

}
export default MassSelectCourse;