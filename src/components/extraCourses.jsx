import RequiredChoice from "./requiredChoice";
import { useState } from "react";
import ClassInfo from "./classInfoPopup";

const ExtraCourses = ({coursesList}) => {
    // gets list of course areas, used in mass select

    let courseAreas = coursesList.map((section) => <option key={section?.area}>{section?.area}</option>)
    const [section, setSection] = useState([])
    const handleSectionChange = (e) => {
        setSection(e.target.value)
    }

    let allCourseList = []
    {coursesList.filter(area => area.area === section).map(selectedArea => selectedArea.courses.map(course => allCourseList.push(course)))}
    
    let sortedTotalCourses = allCourseList.sort(function (a, b) {
        if (a.courseID < b.courseID) {
          return -1;
        }
        if (a.courseID > b.courseID) {
          return 1;
        }
        return 0;
      })


    const [userCourses, setUserCourses] = useState([])
    const [course, setCourse] = useState('');

    const handleChangeCourse=(e)=>{
        setCourse(e.target.value)
    }


    const handleAddCourse = () => {
        const courseInfo = course
        {sortedTotalCourses.filter((course) => course.courseID.match(courseInfo)).map((selectedCourse)=> 
            setUserCourses([...userCourses, selectedCourse
            ]))}
        

    }

    const removeCourse = (index) =>{
        let data = [...userCourses]
        data.splice(index, 1)
        setUserCourses(data)
    }

    return(
       
        <div id='specifcElective'>
            

            { userCourses.map((key, index) => <RequiredChoice key={index} classId={key.courseID} creditHours={key.credit} preReq={key.prerequisites} removeCourse={()=>removeCourse(index)}/>) }
            <label>
                Select Section:
                <select name='section' onChange={handleSectionChange}>
                    <option value="default"></option>
                    { courseAreas }
                </select>
            </label>

            <p><b>Available Courses:</b></p>

    
            <div id="popupDiv">
                {sortedTotalCourses.map((singleCourse, index) => (
                    <div key={singleCourse.id}>
                        <div style={{display: "flex"}}>
                            <ClassInfo key={index} className={singleCourse.courseID} classTitle={singleCourse.name} classDescript={singleCourse.description} creditHours={singleCourse.credit} preReq={singleCourse.prerequisites} lastOffered={singleCourse.pastTerms[0]}/>
                        
                        </div>
    
                
                            
                    
                    </div>
                ))}
            </div>
            <label>
                Choose course:
                <select id='chooseNumber' name='course' onChange={handleChangeCourse}>
                    <option value=""></option>
                    {sortedTotalCourses.map((key) => (
                    <option value={key.courseID}>{key.courseID}</option>))}
                </select>
            </label>

            <button id='addCourseButton' onClick={handleAddCourse}>Add Course</button>
            
        </div>
               
    )
}

export default ExtraCourses;