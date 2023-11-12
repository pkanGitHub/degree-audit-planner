import { useState } from "react";
import "../styles/audit.css";
import ClassInfo from "./classInfoPopup";
import RequiredChoice from "./requiredChoice";

const MassSelectCourse = ({coursesList}) => {
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

    const categorySelect = {"BISC": "Biological Science", "PHSC": 'Physical Science', "MSCI": "Mathematical Science", "BSCI": "Behavioral Science", "SSCI": "Social Science", "HUM": "Humanities", "GLAB": "Labratory Course"}

    let courseOptions = null;
    let getOptions = []
    if(selectCourseType){
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
                    {Object.keys(categorySelect).map((key, index) => 
                    <option value={key}>{categorySelect[key]}</option>)}
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