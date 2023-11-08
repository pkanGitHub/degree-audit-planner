import "../styles/audit.css"
import RequiredCourse from "./requiredCourse"

const CatalogItems = ({type, category, coursesList}) => {
    return(
        type.filter(option => option.title.match(category)).map((selectedOption)=> (
            
            <div key={selectedOption?._id}>
                <h2>{selectedOption?.title}</h2>
                {selectedOption?.courses && selectedOption.courses.map((course)=> (
                    <div key={course?._id}>
                        <ul className="accordion">
                            <li>
                            <input type="checkbox" name="accordion" id={course?._id} />
                            <label id="genReqLabel" htmlFor={course?._id}>{course?.label}</label>
                            
                            <div className="classHistory">
                        
                                    {course?.list && course.list.map ((item) => (
                                        <div key={item?._id}>
                                
                                            {coursesList.filter((area) => area.courses.some((course) => course.courseID === item?.id)).map((area)=> area.courses.filter((course) => course.courseID.match(item?.id)).map((selectedCourse) => <RequiredCourse key={selectedCourse._id} classId={selectedCourse.courseID} creditHours={selectedCourse.credit} preReq={selectedCourse.prerequisites}/>))}
                                
                                            <div id="orClasses">
                                                {item?.or && item.or.map((extra) => (
                                                    <div key={extra}>
                                                    <p>Or:</p>
                                                    {coursesList.filter((area) => area.courses.some((course) => course.courseID === extra)).map((area)=> area.courses.filter((course) => course.courseID.match(extra)).map((selectedCourse) => <RequiredCourse key={selectedCourse._id} classId={selectedCourse.courseID} creditHours={selectedCourse.credit} preReq={selectedCourse.prerequisites}/>))}
                                                    </div>
                                                ))}
                                            </div>
                                            <hr/>
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
                ))}
            </div>
    
        ))

    )

}

export default CatalogItems