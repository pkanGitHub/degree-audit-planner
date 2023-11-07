export default function SemesterPlan(props) {

    const semesters = props.data[0].semesters;

    // console.log(props.data[0].semesters)
    return (
        <div id="planner">
            <h2 id='userPlanner'>User's Degree Planner</h2>
            <table id='twoSemesterPlan'>
                { semesters.map((semester, index) => {
                    const courses = semester.courses;

                    return (
                        <tr key={index} className="courseTableInfo" id="tableDataHeading">
                            { courses.map((course, index) => <td key={index}>{ course }</td> )}
                        </tr>
                    )
                })}
            </table>
        </div>
    );
}