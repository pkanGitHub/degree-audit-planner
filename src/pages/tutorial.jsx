import "../styles/tutorial.css";
import { Link } from 'react-router-dom';

const Tutorial = () => {
    return (
        <div className="tutorialPage">
            <h1>Tutorial</h1>

            <div>
                <h2>Audit Page</h2>
                <p>The <Link to="/audit">audit</Link> is where the main function of Mizzou Planner lies. Here you can choose any Majors, Minors, or Certificates you have or would like to enroll in.</p>
                <p>The audit page is made up of 3 main parts. The program selection, the course selection, and the degree plan.</p>

                <div className="accordion">
                    <div>
                        <input type="checkbox" name="accordion" id="programSelect" />
                        <label id="accordionLabel" htmlFor="programSelect">Selecting Programs</label>
                        <div className="accordionContent">
                            <p>The first, located at the top of the page, is where you upload files(see <Link to="#uploading">Uploading Files</Link>) and select your programs.</p>
                            <p>Here you must choose the <b>Type</b> of program (major, minor, or certificate), the <b>Year</b> you enrolled in the program, and the <b>Category</b>(title of the program).</p>
                            <img src={process.env.PUBLIC_URL + '/imgs/audit-tutorial-image1.png'} alt="Audit selections: Type, Year, Category" className="tutorialImage" />
                        </div>
                    </div>
                </div>

                <div className="accordion">
                    <div>
                        <input type="checkbox" name="accordion" id="addCourses" />
                        <label id="accordionLabel" htmlFor="addCourses">Adding Courses</label>
                        <div className="accordionContent">
                            <p>The second section is for selecting courses. Here you will be shown the various recommended courses for each program you have chosen and any other requirements.</p>
                            <img src={process.env.PUBLIC_URL + '/imgs/audit-tutorial-image2.png'} alt="Course selections" className="tutorialImage" />
                            <br />
                            <p>Adding courses is as simple as clicking on the desired course ID and then selecting the <b>Add Course</b> button.</p>
                            <p>The added course will then be displayed above, and you can set the courses status(Planned, In Progress, or Completed) and choose the semester and year you plan to/have taken the course.</p>
                            <img src={process.env.PUBLIC_URL + '/imgs/audit-tutorial-image3.png'} alt="Adding courses" className="tutorialImage" />
                        </div>
                    </div>
                </div>

                <div className="accordion">
                    <div>
                        <input type="checkbox" name="accordion" id="degreePlan" />
                        <label id="accordionLabel" htmlFor="degreePlan">The Degree Plan</label>
                        <div className="accordionContent">
                            <p>The third and final section of the audit page is the <b>Degree Plan.</b> Here is where you are able to see all of the courses you have chosen displayed in a table.</p>
                            <p>The courses are color coded(black for planned, blue for in progress, and green for completed) to make reading the plan easier.</p>
                            <p>The courses can be moved, deleted, or have their status changed by clicking on them.</p>
                            <img src={process.env.PUBLIC_URL + '/imgs/audit-tutorial-image4.png'} alt="Degree Plan" className="tutorialImage" />
                        </div>
                    </div>
                </div>




            </div>

            <div id="uploading">
                <h2>Uploading Files</h2>
                <p>For students that have already completed some number of semesters or years at Mizzou we offer the ability to upload files and have your information automatically filled out. You may upload either your <b>Academic Profile</b> from Mizzou, or our <b>custom PDF</b> that can be exported after designing a plan.</p>
                <br />
                <div className="accordion">

                    <input type="checkbox" name="accordion" id="academicProfile" />
                    <label id="accordionLabel" htmlFor="academicProfile">Getting your Academic Profile</label>
                    <div className="accordionContent">
                        <h4>To get your Academic Profile from Mizzou follow these steps.</h4>
                        <p>First login to <Link to="https://myzou.missouri.edu/" target='_blank' className='link'>MyZou.</Link></p>
                        <p>Step 1: Select the <b>Academic Records</b> option in the MyZou Student Center.</p>
                        <img src={process.env.PUBLIC_URL + '/imgs/tutorial-image1.jpg'} alt="Select Academic Records in MyZou Student Center" className="tutorialImage" />
                        <p>Step 2: Select the <b>Request Student Academic Profile</b> option on the sidebar.</p>
                        <p>Step 3: Click <b>Submit</b></p>
                        <img src={process.env.PUBLIC_URL + '/imgs/tutorial-image2.jpg'} alt="Select Request Student Academic Profile" className="tutorialImage" />
                        <p>Step 4: Wait for your academic profile to be emailed to you. This may take a few minutes.</p>
                    </div>
                </div>

                <div className="accordion">

                    <input type="checkbox" name="accordion" id="exporting" />
                    <label id="accordionLabel" htmlFor="exporting">Exporting your Degree Plan</label>
                    <div className="accordionContent">
                        <p>The degree plan can be exported by simply clicking the export button located at the bottom of the audit page. This will automatically generate a PDF version of your plan and save it to your downloads folder.</p>
                        <p>This can be done regardless of whether you have an account with us, so if you'd rather just keep a copy of your plan instead of creating an account with us that is fine! You can always reupload the file and continue working on it at a later date.</p>
                        <img src={process.env.PUBLIC_URL + '/imgs/exporting-tutorial-image1.png'} alt="Export button" className="tutorialImage" />
                    </div>
                </div>


            </div>
        </div>

    )
};

export default Tutorial;