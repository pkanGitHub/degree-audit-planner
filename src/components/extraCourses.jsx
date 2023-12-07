import RequiredChoice from "./requiredChoice";
import { useState } from "react";
import ClassInfo from "./classInfoPopup";
import { sortCourses } from "./massSelectCourse";
import * as User from "../lib/user";
import { Course } from "../lib/course";

const ExtraCourses = ({ coursesList, update, userCourses }) => {
    // gets list of course areas, used in mass select

    let courseAreas = coursesList.map((section) => <option key={section?.area}>{section?.area}</option>)
    const [section, setSection] = useState([])
    const handleSectionChange = (e) => {
        setSection(e.target.value)
    }

    const [searchFilter, setSearchFilter] = useState("");

    let allCourseList = coursesList
        .filter(area => area.area === section)
        .map(selectedArea => selectedArea.courses)
        .flat()
        .filter(course => course.name.match(searchFilter, "g") || course.courseID.match(searchFilter, "g"))

    let sortedTotalCourses = allCourseList.sort(function (a, b) {
        if (a.courseID < b.courseID) {
            return -1;
        }
        if (a.courseID > b.courseID) {
            return 1;
        }
        return 0;
    })
        .map(course => ({ ...course, inUser: userCourses.find(uCourse => uCourse.id?.toLowerCase() === course.courseID?.toLowerCase()) }))
        .sort(sortCourses)


    const [course, setCourse] = useState('');

    const handleChangeCourse = (e) => {
        setCourse(e.target.value)
    }

    const [selectCourse, setSelectCourse] = useState('');
    const select = (id) => {
        setSelectCourse(id);
    }

    const addCourse = (id) => {
        const course = sortedTotalCourses.find(course => course.courseID?.toLowerCase() === id?.toLowerCase());
        User.addCourse(new Course(course.courseID, -1, -1, course.credit));
        update();
    }
    const removeCourse = course => {
        User.removeCourse(course.inUser);
        update();
    }

    const handleSearch = event => {
        const text = event.target.value;

        setSearchFilter(text);
    }

    return (

        <div id='specifcElective'>


            {sortedTotalCourses.filter(course => course.inUser).map((key, index) =>
                <RequiredChoice key={index}
                    classId={key.courseID}
                    creditHours={key.credit}
                    preReq={key.prerequisites}
                    removeCourse={() => removeCourse(key)}
                    course={key.inUser}
                    update={update}
                />)}
            <label>
                Select Section:&nbsp;&nbsp;
                <select name='section' onChange={handleSectionChange}>
                    <option value="default"></option>
                    {courseAreas}
                </select>
            </label>

            <p><b>Available Courses:</b></p>


            <div id="popupDiv">
                {sortedTotalCourses.map((singleCourse, index) => (
                    <div key={singleCourse.id}>
                        <div style={{ display: "flex" }} className={`courseSelectButton ${selectCourse === singleCourse.courseID ? "selected" : ""}`}>
                            <ClassInfo key={index}
                                className={singleCourse.courseID}
                                classTitle={singleCourse.name}
                                classDescript={singleCourse.description}
                                creditHours={singleCourse.credit}
                                preReq={singleCourse.prerequisites}
                                lastOffered={singleCourse.pastTerms[0]}
                                fromUser={singleCourse.inUser}
                                select={select}
                            />

                        </div>




                    </div>
                ))}
            </div>

            <label>
                Search:
                <input type="text" name="searchBox" id="searchBox" onChange={handleSearch} />
            </label>

            {/* <label>
                Choose course:&nbsp;&nbsp;
                <select id='chooseNumber' name='course' onChange={handleChangeCourse}>
                    <option value=""></option>
                    {sortedTotalCourses.map((key) => (
                    <option value={key.courseID}>{key.courseID}</option>))}
                </select>
            </label> */}

            <button id='addCourseButton' onClick={() => addCourse(selectCourse)}>Add Course</button>

        </div>

    )
}

export default ExtraCourses;