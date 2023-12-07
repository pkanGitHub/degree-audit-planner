import { useEffect, useMemo, useState } from "react";
import "../styles/audit.css";
import ClassInfo from "./classInfoPopup";
import RequiredChoice from "./requiredChoice";
import { Tooltip } from 'react-tooltip'
import * as User from "../lib/user";
import { Course } from "../lib/course"
import { PlusOutlined } from "@ant-design/icons";

const MassSelectCourse = ({ coursesList, categories, update, userCourses }) => {
    // console.log(userCourses);
    const [selectCourseType, setCourseType] = useState('');
    const handleSelect = (e) => {
        setCourseType(e.target.value)
    }

    const [selectCourse, setSelectCourse] = useState('');
    const handleCourseSelect = (e) => {
        setSelectCourse(e.target.value)
    }
    function selectCourseNow(course) {
        setSelectCourse(course);
    }

    // const [userCourses, setUserCourses] = useState(User.getCourses());
    const addCourse = (course) => {
        User.addCourse(new Course(course.courseID, -1, -1, course.credit));
        // setUserCourses([...User.getCourses()]);
        update();
    }
    const removeCourse = course => {
        User.removeCourse(course);
        // setUserCourses([...User.getCourses()]);
        update();
    }

    const [searchFilter, setSearchFilter] = useState("");
    const handleSearch = event => {
        setSearchFilter(event.target.value);
        // getOptions.filter(course => course.name?.match(searchFilter, "g") || course.courseID?.match(searchFilter, "g"));
    }


    const [selectedCourses, setSelectedCourses] = useState([])
    const handleLargeCourseClick = () => {
        const courseInfo = selectCourse

        getOptions.filter(singleClass => singleClass.courseID.match(courseInfo)).forEach(course => addCourse(course))

        // .map(filteredClass => (

        //     setSelectedCourses([...selectedCourses, { key: filteredClass._id, classId: filteredClass.courseID, creditHours: filteredClass.credit, preReq: filteredClass.prerequisites }])

        // ))


    }

    // const removeCourse = (index) => {
    //     let data = [...selectedCourses]
    //     data.splice(index, 1)
    //     setSelectedCourses(data)
    // }

    const categorySelect = [{ id: "BISC", name: "Biological Science" }, { id: "PHSC", name: 'Physical Science' }, { id: "MSCI", name: "Mathematical Science" }, { id: "BSCI", name: "Behavioral Science" }, { id: "SSCI", name: "Social Science" }, { id: "HUM", name: "Humanities" }, { id: "GLAB", name: "Labratory Course" }, { id: "W", name: "Writing Intensive" }, { id: "MQR", name: "Math Requirement" }, { id: "MSLR", name: "MO State Law Course" }]
    const filteredCategory = []

    categories.map(singleCategory => categorySelect
        .filter(category => category.id.match(singleCategory))
        .map(sortedCategory => filteredCategory.push({ id: sortedCategory.id, name: sortedCategory.name })))


    // eslint-disable-next-line react-hooks/exhaustive-deps
    let getOptions = []
    if (selectCourseType === "W") {
        coursesList.filter((area) => area.courses
            .some((course) => course?.courseID && course.courseID.endsWith("W")))
            .map((area) => area.courses.filter((course) => course.courseID.endsWith("W"))
                .map(course => ({ ...course, inUser: userCourses.find(uCourse => uCourse.id?.toLowerCase() === course.courseID?.toLowerCase()) }))
                .sort(sortCourses)
                .map((selectedCourse) => getOptions.push(selectedCourse)))
    }
    else {
        coursesList.map(area => area.courses
            .filter(course => course?.categories && course.categories.some(category => category === selectCourseType))
            .map(course => ({ ...course, inUser: userCourses.find(uCourse => uCourse.id?.toLowerCase() === course.courseID?.toLowerCase()) }))
            .sort(sortCourses)
            .map(course => getOptions.push(course)))
    }

    useEffect(() => {
        if (filteredCategory.length === 1) setCourseType(filteredCategory[0].id);
    }, []);

    useEffect(() => {
        getOptions.sort(sortCourses)
    }, [userCourses, getOptions, searchFilter]);

    // console.log(coursesList.filter(course => course.inUser));

    return (

        <div id='largeClassSelect'>


            {getOptions.filter(course => course.inUser).map((key, index) =>
                <RequiredChoice
                    key={index}
                    classId={key.courseID}
                    creditHours={key.credit}
                    preReq={key.prerequisites}
                    course={key.inUser}
                    removeCourse={removeCourse} update={update}
                />
            )}


            {filteredCategory.length > 1 ?
                <label>
                    Course type:&nbsp;&nbsp;


                    <select id='chooseCourseType' name="courseType" onChange={handleSelect}>
                        <option value=""></option>
                        {filteredCategory.map((key) =>
                            <option key={key.id} value={key.id}>{key.name}</option>)}
                    </select>
                </label>
                :
                null
            }


            <p>
                Choose from {selectCourseType} courses below:
            </p>
            <div id="popupDiv">

                {getOptions.filter(course => course.name?.match(new RegExp(searchFilter, "gi")) || course.courseID?.match(new RegExp(searchFilter, "gi"))).map(item => {
                    return (
                        <div className={`courseSelectButton ${selectCourse === item.courseID ? "selected" : ""}`} >
                            <ClassInfo
                                key={item._id}
                                className={item.courseID}
                                classTitle={item.name}
                                classDescript={item.description}
                                creditHours={item.credit}
                                preReq={item.prerequisites}
                                lastOffered={item.pastTerms[0]}
                                fromUser={item.inUser}
                                select={selectCourseNow}
                            />
                        </div>
                    )

                })}

            </div>

            {getOptions.length > 10 ?
                <label>
                    Search:
                    <input type="text" name="searchBox" id="searchBox" onChange={handleSearch} />
                </label>
                :
                null
            }



            {/* <label>
                Course Options:&nbsp;&nbsp;
                <select name="courseName" onChange={handleCourseSelect}>
                    <option value=""></option>
                    {courseOptions}
                </select>
            </label> */}


            <button onClick={handleLargeCourseClick} id='addCourseButton'><PlusOutlined /> Add Course</button>


        </div>

    )

}

export function sortCourses(a, b) {
    if (a.inUser && !b.inUser) return -1;
    if (!a.inUser && b.inUser) return 1;
    return 0;
}


export default MassSelectCourse;