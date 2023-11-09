import { getCourseById } from "../lib/data";


export default function SemesterPlan(props) {

    var data = props.data;

    // if (props.data.length === 0) data = [{"_id":{"$oid":"654ab5eaf2b96bb0361ba92e"},"title":"BSAcc in Accountancy","__v":{"$numberInt":"0"},"requirements":[{"label":"Accountancy Foundation Courses","credits":"3","required":"true","list":[{"id":"COMMUN_1200","_id":{"$oid":"654ab5eae7f2260bb9fe2534"}}],"info":[{"index":{"$numberInt":"1"},"comment":"International Component (See your academic advisor about completion of this requirement.)","_id":{"$oid":"654ab5eae7f2260bb9fe2535"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe2533"}},{"label":"Pre-Accountancy Courses","credits":"33","required":"false","list":[{"id":"ACCTCY_2036","or":["ACCTCY_2136H","ACCTCY_2026"],"_id":{"$oid":"654ab5eae7f2260bb9fe2537"}},{"id":"ACCTCY_2037","or":["ACCTCY_2137H","ACCTCY_2027"],"_id":{"$oid":"654ab5eae7f2260bb9fe2538"}},{"id":"ACCTCY_2258","_id":{"$oid":"654ab5eae7f2260bb9fe2539"}},{"id":"BUS_AD_1500","_id":{"$oid":"654ab5eae7f2260bb9fe253a"}},{"id":"ECONOM_1014","_id":{"$oid":"654ab5eae7f2260bb9fe253b"}},{"id":"ECONOM_1015","_id":{"$oid":"654ab5eae7f2260bb9fe253c"}},{"id":"ENGLSH_1000","_id":{"$oid":"654ab5eae7f2260bb9fe253d"}},{"id":"MATH_1100","_id":{"$oid":"654ab5eae7f2260bb9fe253e"}},{"id":"MATH_1300","_id":{"$oid":"654ab5eae7f2260bb9fe253f"}},{"id":"MATH_1400","_id":{"$oid":"654ab5eae7f2260bb9fe2540"}},{"id":"STAT_2500","_id":{"$oid":"654ab5eae7f2260bb9fe2541"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe2536"}},{"label":"Required Business Core Courses","credits":"24","required":"true","list":[{"id":"ECONOM_3229","_id":{"$oid":"654ab5eae7f2260bb9fe2543"}},{"id":"ECONOM_3251","or":["ECONOM_4351"],"_id":{"$oid":"654ab5eae7f2260bb9fe2544"}},{"id":"FINANC_3000","_id":{"$oid":"654ab5eae7f2260bb9fe2545"}},{"id":"MANGMT_3000","or":["MANGMT_3000W"],"_id":{"$oid":"654ab5eae7f2260bb9fe2546"}},{"id":"MANGMT_3300","_id":{"$oid":"654ab5eae7f2260bb9fe2547"}},{"id":"MANGMT_3540","_id":{"$oid":"654ab5eae7f2260bb9fe2548"}},{"id":"MRKTNG_3000","_id":{"$oid":"654ab5eae7f2260bb9fe2549"}},{"id":"STAT_3500","_id":{"$oid":"654ab5eae7f2260bb9fe254a"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe2542"}},{"label":"Required Accountancy Courses","credits":"21","required":"true","list":[{"id":"ACCTCY_3326","_id":{"$oid":"654ab5eae7f2260bb9fe254c"}},{"id":"ACCTCY_3328","_id":{"$oid":"654ab5eae7f2260bb9fe254d"}},{"id":"ACCTCY_3346","_id":{"$oid":"654ab5eae7f2260bb9fe254e"}},{"id":"ACCTCY_3347","_id":{"$oid":"654ab5eae7f2260bb9fe254f"}},{"id":"ACCTCY_4353","_id":{"$oid":"654ab5eae7f2260bb9fe2550"}},{"id":"ACCTCY 4384/7384","_id":{"$oid":"654ab5eae7f2260bb9fe2551"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe254b"}},{"label":"Accountancy/Business Elective","credits":"3-6","required":"false","list":[],"_id":{"$oid":"654ab5eae7f2260bb9fe2552"}},{"label":"Professional Electives","credits":"6","required":"false","list":[],"_id":{"$oid":"654ab5eae7f2260bb9fe2553"}},{"label":"Six credits must be taken as 2000-level or higher University non-business electives or 3000-level business electives","credits":"6","required":"0","list":[],"_id":{"$oid":"654ab5eae7f2260bb9fe2554"}},{"label":"Senior Capstone","credits":"3","required":"false","list":[{"id":"MANGMT_4970","_id":{"$oid":"654ab5eae7f2260bb9fe2556"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe2555"}},{"label":"Graduate Level Coursework","credits":"30","required":"false","list":[],"_id":{"$oid":"654ab5eae7f2260bb9fe2557"}},{"label":"General Education","credits":"18","required":"false","list":[],"_id":{"$oid":"654ab5eae7f2260bb9fe2558"}},{"label":"Free Elective","credits":"12","required":"false","list":[],"_id":{"$oid":"654ab5eae7f2260bb9fe2559"}},{"label":"Total Minimum","credits":"150","required":"false","list":[],"_id":{"$oid":"654ab5eae7f2260bb9fe255a"}},{"label":"# Internship","credits":"","required":"false","list":[{"id":"ACCTCY 4940/7940","_id":{"$oid":"654ab5eae7f2260bb9fe255c"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe255b"}},{"label":"Accountancy Elective","credits":"3","required":"false","list":[],"info":[{"index":{"$numberInt":"0"},"comment":" ","_id":{"$oid":"654ab5eae7f2260bb9fe255e"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe255d"}}],"years":[{"label":"Year 1","semesters":[{"label":"Semester 1","courses":[{"id":"BUS_AD_1500","_id":{"$oid":"654ab5eae7f2260bb9fe24f2"}},{"id":"COMMUN_1200","_id":{"$oid":"654ab5eae7f2260bb9fe24f3"}},{"id":"MATH_1100","_id":{"$oid":"654ab5eae7f2260bb9fe24f4"}},{"misc":"State Requirement","_id":{"$oid":"654ab5eae7f2260bb9fe24f5"}},{"misc":"Humanities","_id":{"$oid":"654ab5eae7f2260bb9fe24f6"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe24f1"}},{"label":"Semester 2","courses":[{"id":"ENGLSH_1000","_id":{"$oid":"654ab5eae7f2260bb9fe24f8"}},{"id":"MATH_1300","_id":{"$oid":"654ab5eae7f2260bb9fe24f9"}},{"misc":"Humanities  ","_id":{"$oid":"654ab5eae7f2260bb9fe24fa"}},{"misc":"Physical/Biological Science with a Lab","_id":{"$oid":"654ab5eae7f2260bb9fe24fb"}},{"misc":"Free Elective","_id":{"$oid":"654ab5eae7f2260bb9fe24fc"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe24f7"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe24f0"}},{"label":"Year 2","semesters":[{"label":"Semester 3","courses":[{"id":"ACCTCY_2036","or":["ACCTCY_2136H"],"_id":{"$oid":"654ab5eae7f2260bb9fe24ff"}},{"id":"ECONOM_1014","_id":{"$oid":"654ab5eae7f2260bb9fe2500"}},{"id":"MANGMT_3300","_id":{"$oid":"654ab5eae7f2260bb9fe2501"}},{"id":"MATH_1400","_id":{"$oid":"654ab5eae7f2260bb9fe2502"}},{"id":"STAT_2500","_id":{"$oid":"654ab5eae7f2260bb9fe2503"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe24fe"}},{"label":"Semester 4","courses":[{"id":"ACCTCY_2037","or":["ACCTCY_2137H"],"_id":{"$oid":"654ab5eae7f2260bb9fe2505"}},{"id":"ACCTCY_2258","_id":{"$oid":"654ab5eae7f2260bb9fe2506"}},{"id":"ECONOM_1015","_id":{"$oid":"654ab5eae7f2260bb9fe2507"}},{"id":"MANGMT_3000W","_id":{"$oid":"654ab5eae7f2260bb9fe2508"}},{"misc":"Free Elective","_id":{"$oid":"654ab5eae7f2260bb9fe2509"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe2504"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe24fd"}},{"label":"Year 3","semesters":[{"label":"Semester 5","courses":[{"id":"ACCTCY_3326","_id":{"$oid":"654ab5eae7f2260bb9fe250c"}},{"id":"ACCTCY_3328","_id":{"$oid":"654ab5eae7f2260bb9fe250d"}},{"id":"ECONOM_3229","_id":{"$oid":"654ab5eae7f2260bb9fe250e"}},{"id":"STAT_3500","_id":{"$oid":"654ab5eae7f2260bb9fe250f"}},{"misc":"Free Elective","_id":{"$oid":"654ab5eae7f2260bb9fe2510"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe250b"}},{"label":"Semester 6","courses":[{"id":"ACCTCY_3346","_id":{"$oid":"654ab5eae7f2260bb9fe2512"}},{"id":"ACCTCY_4353","_id":{"$oid":"654ab5eae7f2260bb9fe2513"}},{"id":"FINANC_3000","_id":{"$oid":"654ab5eae7f2260bb9fe2514"}},{"id":"MRKTNG_3000","_id":{"$oid":"654ab5eae7f2260bb9fe2515"}},{"misc":"Free Elective","_id":{"$oid":"654ab5eae7f2260bb9fe2516"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe2511"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe250a"}},{"label":"Year 4","semesters":[{"label":"Semester 7","courses":[{"misc":" ","_id":{"$oid":"654ab5eae7f2260bb9fe2519"}},{"id":"ACCTCY_3347","_id":{"$oid":"654ab5eae7f2260bb9fe251a"}},{"id":"ACCTCY_4384","_id":{"$oid":"654ab5eae7f2260bb9fe251b"}},{"id":"ECONOM_3251","or":["ECONOM_4351"],"_id":{"$oid":"654ab5eae7f2260bb9fe251c"}},{"id":"MANGMT_3540","_id":{"$oid":"654ab5eae7f2260bb9fe251d"}},{"misc":"Free Elective","_id":{"$oid":"654ab5eae7f2260bb9fe251e"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe2518"}},{"label":"Semester 8","courses":[{"misc":"Non Internship (for Internship plan-see below)#","_id":{"$oid":"654ab5eae7f2260bb9fe2520"}},{"id":"MANGMT_4970","_id":{"$oid":"654ab5eae7f2260bb9fe2521"}},{"misc":"ACCTCY/BUS Elective","_id":{"$oid":"654ab5eae7f2260bb9fe2522"}},{"misc":"Professional Elective","_id":{"$oid":"654ab5eae7f2260bb9fe2523"}},{"misc":"Professional Elective","_id":{"$oid":"654ab5eae7f2260bb9fe2524"}},{"misc":"Free Elective","_id":{"$oid":"654ab5eae7f2260bb9fe2525"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe251f"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe2517"}},{"label":"Year 5","semesters":[{"label":"Semester 9","courses":[{"misc":"Accountancy Elective","_id":{"$oid":"654ab5eae7f2260bb9fe2528"}},{"misc":"Accountancy Elective","_id":{"$oid":"654ab5eae7f2260bb9fe2529"}},{"misc":"Accountancy Elective","_id":{"$oid":"654ab5eae7f2260bb9fe252a"}},{"misc":"Accountancy/Business Elective","_id":{"$oid":"654ab5eae7f2260bb9fe252b"}},{"misc":"Accountancy/Business Elective","_id":{"$oid":"654ab5eae7f2260bb9fe252c"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe2527"}},{"label":"Semester 10","courses":[{"id":"ACCTCY_8450","_id":{"$oid":"654ab5eae7f2260bb9fe252e"}},{"id":"MANGMT_7010","_id":{"$oid":"654ab5eae7f2260bb9fe252f"}},{"misc":"Accountancy Elective","_id":{"$oid":"654ab5eae7f2260bb9fe2530"}},{"misc":"Accountancy Elective","_id":{"$oid":"654ab5eae7f2260bb9fe2531"}},{"misc":"Accountancy/Business Elective","_id":{"$oid":"654ab5eae7f2260bb9fe2532"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe252d"}}],"_id":{"$oid":"654ab5eae7f2260bb9fe2526"}}]}];
    const years = data[0]?.years;

    if (years != null) return (
        <div id="planner">
            <h2 id='userPlanner'>User's Degree Planner</h2>
                {years?.map(year => {
                    const rows =  year?.semesters[0].courses.length > year?.semesters[1].courses.length ? year?.semesters[0].courses.length : year?.semesters[1].courses.length;
                    var total1 = 0;
                    var total2 = 0;

                    return (
                        <table key={year.label} id={year.label} className="planTable">
                            <thead>
                                <tr>
                                    <th colSpan={4} id='tableHeading'>{year.label}</th>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="semesterHeading">Semester 1</td>
                                    <td colSpan={2} className="semesterHeading">Semester 2</td>
                                </tr>
                                <tr className="courseTableInfo" id="tableDataHeading">
                                    <td>Course name</td>
                                    <td>Credit hours</td>
                                    <td>Course name</td>
                                    <td>Credit hours</td>
                                </tr>
                            </thead>          
                            <tbody>
                                {[...Array(rows).keys()].map(r => {

                                    const semester1 = year.semesters[0].courses;
                                    const semester2 = year.semesters[1].courses;

                                    const course1 = semester1[r]?.id;
                                    const course2 = semester2[r]?.id;

                                    return (
                                        <tr className="courseTableInfo" key={r}>
                                            <td>{ course1?.replace(/_/g, " ") }</td>
                                            <td>{ (() => {
                                                const credit = getCourseById(course1)?.credit; 
                                                total1 += !isNaN(Number(credit)) ? Number(credit) : 0;
                                                return credit;
                                            })()}</td>
                                            <td>{ course2?.replace("_", " ") }</td>
                                            <td>{ (() => {
                                                const credit = getCourseById(course2)?.credit; 
                                                total2 += !isNaN(Number(credit)) ? Number(credit) : 0;
                                                return credit;
                                            })()}</td>
                                        </tr>
                                    )
                                }, year)}
                                <tr id='tableSummary'>
                                    <td><b>Status:</b> Complete</td>
                                    <td><b>Total Credit Hours:</b>{ total1 }</td>
                                    <td><b>Status:</b> In Progress</td>
                                    <td><b>Total Credit Hours:</b>{ total2 }</td>
                                </tr>
                            </tbody>
                        </table>
                    )
                })}
        </div>
    );

    else return (
        <p>No Calendar</p>
    )
}