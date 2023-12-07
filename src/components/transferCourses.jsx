import { useState } from "react";
import RequiredChoice from "./requiredChoice";
import "../styles/audit.css"
import { Course } from "../lib/course";
import * as User from "../lib/user";

const TransferCourse = ({update}) => {
    const [userCourses, setUserCourses] = useState([])


    const [inputs, setInputs] = useState({
        courseName: "",
        creditHour: "",
    });
    const handleChange = (event) => {
        event.preventDefault()

        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }
    const [error, setError] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();


        if (inputs.courseName.trim().length !== 0 && inputs.creditHour.trim().length !== 0 && !isNaN(inputs.creditHour)) {
            const course = new Course(inputs.courseName, -1, -1, inputs.creditHour);
            setUserCourses([...userCourses, {...inputs, inUser: course}])
            User.addCourse(course);
            setError("")
        }
        else if (isNaN(inputs.creditHour)) {
            setError("Credit hours must be a number.")
        }
        else if (inputs.courseName.trim().length === 0 && inputs.creditHour.trim().length !== 0) {
            setError("You must enter a course name.")
        }
        else if (inputs.creditHour.trim().length === 0 && inputs.courseName.trim().length !== 0) {
            setError("You must enter a credit hour.")
        }
        else {
            setError("Both fields must have a value.");
        }


    }

    const removeCourse = (course, index) => {
        let data = [...userCourses]
        data.splice(index, 1)
        setUserCourses(data)
        User.removeCourse(course);
        update();
    }



    return (

        <div id='specifcElective'>


            {userCourses.map((key, index) =>
                <RequiredChoice
                    key={index}
                    classId={key.courseName}
                    creditHours={key.creditHour}
                    preReq={"Transfer course"}
                    removeCourse={() => removeCourse(key.inUser, index)}
                    course={key.inUser}
                    update={update}
                />
            )}
            <div id="transferCourseInput">
                <p id="errorMessage"><b>{error}</b></p>
                <p>Enter the information for your transfer courses here:</p>

                <label htmlFor="courseName">
                    Course name:&nbsp;&nbsp;
                    <input type="text" name="courseName" onChange={handleChange} />
                </label>


                <label htmlFor="creditHour">
                    Credit Hours:&nbsp;&nbsp;
                    <input type="text" name="creditHour" onChange={handleChange} />
                </label>
                <p><b>NOTE:</b> If you do not know how many credits your classes count for, please consult your <a href="https://advising.missouri.edu/contact/" target="_blank">advisor</a>.</p>
            </div>

            <button id='addCourseButton' onClick={handleSubmit}>Add Course</button>

        </div>

    )
}
export default TransferCourse;