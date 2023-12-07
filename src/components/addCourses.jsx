import { useState } from "react";
import ClassInfo from "./classInfoPopup";
import RequiredChoice from "./requiredChoice";
import "../styles/audit.css"
import * as User from "../lib/user";
import { sortCourses } from "./massSelectCourse";
import { Course } from "../lib/course"
const AddCourses = ({ courses, orCourses, update, userCourses }) => {
    // console.log(courses);

    // concatCourses([...courses, ...orCourses]);

    const totalCourses = []
    courses.map((course) => totalCourses.push(course))
    orCourses.map((course) => totalCourses.push(course))
    let sortedTotalCourses = totalCourses.sort(function (a, b) {
        if (a.classId < b.classId) {
            return -1;
        }
        if (a.classId > b.classId) {
            return 1;
        }
        return 0;
    })
    // const [userCourses, setUserCourses] = useState(User.getCourses())
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
        .map(course => ({ ...course, inUser: userCourses.find(uCourse => uCourse.id?.toLowerCase() === course.classId?.toLowerCase()) }))
        .sort(sortCourses)


    const handleChangeCourse = (e) => {
        setCourse(e.target.value)
    }


    // const handleAddCourse = () => {
    //     const courseInfo = course
    //     totalCourses.filter((course) => course.classId.match(courseInfo)).map((selectedCourse) =>
    //         setUserCourses([...userCourses, selectedCourse
    //         ]))
    // }


    const [selectCourse, setSelectCourse] = useState('');
    const handleCourseSelect = (e) => {
        setSelectCourse(e.target.value)
    }
    const selectCourseNow = (course) => {
        setSelectCourse(course);
    }

    const addCourse = (id) => {
        console.log(sortedCourses);
        const course = sortedCourses.find(course => course.classId?.toLowerCase() === id?.toLowerCase());
        User.addCourse(new Course(course.classId, -1, -1, course.creditHours));
        update();
    }
    const removeCourse = course => {
        User.removeCourse(course.inUser);
        update();
    }

    const [searchFilter, setSearchFilter] = useState("");
    const handleSearch = event => {
        setSearchFilter(event.target.value);
        // getOptions.filter(course => course.name?.match(searchFilter, "g") || course.courseID?.match(searchFilter, "g"));
    }

    // const removeCourse = (index) => {
    //     let data = [...userCourses]
    //     data.splice(index, 1)
    //     setUserCourses(data)
    // }

    const [isOrOpen, setIsOrOpen] = useState(false)

    const toggleOrCourses = () => {
        setIsOrOpen(!isOrOpen)
    }

    return (
        <div id='specifcElective'>


            {sortedCourses.filter(course => course.inUser).map((key, index) =>
                <RequiredChoice
                    key={index}
                    classId={key.classId}
                    creditHours={key.creditHours}
                    preReq={key.preReq}
                    course={key.inUser}
                    removeCourse={() => removeCourse(course.inUser)}
                    update={update}
                />
            )}

            <p><b>Available Courses:</b></p>


            <div id="popupDiv">
                {sortedCourses.map((singleCourse, index) => {
                    if ((orCourses.filter(course => course.orId.match(singleCourse.id))).length > 0) {
                        return (
                            <div key={singleCourse.id}>
                                <div style={{ display: "flex" }}>


                                    <div className={`courseSelectButton ${selectCourse === singleCourse.classId ? "selected" : ""}`} >
                                        <ClassInfo
                                            key={index}
                                            className={singleCourse.classId}
                                            classTitle={singleCourse.name}
                                            classDescript={singleCourse.description}
                                            creditHours={singleCourse.creditHours}
                                            preReq={singleCourse.preReq}
                                            lastOffered={singleCourse.lastOffered}
                                            fromUser={singleCourse.inUser}
                                            select={selectCourseNow}
                                        />
                                    </div>

                                    <button onClick={toggleOrCourses}>
                                        {isOrOpen ? '-' : '+'}
                                    </button>
                                </div>


                                {isOrOpen && orCourses.filter((course) => course.orId.match(singleCourse.id)).map((chosenCourse, index) =>

                                (
                                    <div>

                                        <div style={{ display: "flex" }}>
                                            <p>or:</p>
                                            <div className={`courseSelectButton ${selectCourse === singleCourse.classId ? "selected" : ""}`} >
                                                <ClassInfo
                                                    key={index}
                                                    className={singleCourse.classId}
                                                    classTitle={singleCourse.name}
                                                    classDescript={singleCourse.description}
                                                    creditHours={singleCourse.creditHours}
                                                    preReq={singleCourse.preReq}
                                                    lastOffered={singleCourse.lastOffered}
                                                    fromUser={singleCourse.inUser}
                                                    select={selectCourseNow}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                                )}

                            </div>
                        )
                    }
                    else {
                        return (
                            <div key={singleCourse.id}>

                                <div className={`courseSelectButton ${selectCourse === singleCourse.classId ? "selected" : ""}`} >
                                    <ClassInfo
                                        key={index}
                                        className={singleCourse.classId}
                                        classTitle={singleCourse.name}
                                        classDescript={singleCourse.description}
                                        creditHours={singleCourse.creditHours}
                                        preReq={singleCourse.preReq}
                                        lastOffered={singleCourse.lastOffered}
                                        fromUser={singleCourse.inUser}
                                        select={selectCourseNow}
                                    />
                                </div>


                            </div>
                        )
                    }
                })}
            </div>
            {/* <label>
                Course number:&nbsp;&nbsp;
                <select id='chooseNumber' name='course' onChange={handleChangeCourse}>
                    <option value=""></option>
                    {sortedTotalCourses.map((key) => (
                        <option key={key.classId} value={key.classId}>{key.classId}</option>))}
                </select>
            </label> */}

            {sortedCourses.length > 10 ?
                <label>
                    Search:
                    <input type="text" name="searchBox" id="searchBox" onChange={handleSearch} />
                </label>
                :
                null
            }


            <button id='addCourseButton' onClick={() => addCourse(selectCourse)}>ADD COURSE</button>

        </div>
    )
}



export default AddCourses;