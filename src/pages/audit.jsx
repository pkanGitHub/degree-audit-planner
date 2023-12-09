import "../styles/audit.css";
import CatalogItems from "../components/catalog";
import { useState, useEffect } from "react";
import GenEdsModel from "../components/genEds";
import ExtraCourses from "../components/extraCourses";
import TransferCourse from "../components/transferCourses";
import SemesterPlan from "../components/semesterplan";
import { getCerts, getCourseList, getGenEds, getMajors, getMinors } from "../lib/data";
import TranscriptUpload from "../components/transcriptUpload";
import * as User from "../lib/user";
import { exportData } from "../lib/filehandling";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PlanPosition from "../components/planPosition";

const Audit = () => {

    // === State Variables === //
    const [selectType, setType] = useState("");
    const [selectCategory, setCategory] = useState("");
    const [selectTerm, setTerm] = useState(null);

    const [enrollFields, setEnrollFields] = useState([{ type: "", category: "", year: "" }]);
    const [userCatalog, setUserCatalog] = useState([{ type: "", category: "", year: "" }]);
    const [userCourses, setUserCourses] = useState(User.getCourses());

    const [minors, setMinors] = useState({});
    const [majors, setMajors] = useState({});
    const [certificates, setCertificates] = useState({});
    const [coursesList, setCourses] = useState([]);
    const [genEds, setGenEds] = useState([]);

    const [state] = useState(0) // when clicked, refreshes state on the gen eds, transfer, and elective courses

    // === Cookies === //
    const cookies = new Cookies();
    const userCookie = cookies.get("user")
    const loggedIn = Boolean(userCookie?.id);

    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        User.checkStorage();

        getMajors().then(val => setMajors(val));
        getCourseList().then(val => setCourses(val))
            .then(() => {
                if (!loggedIn) return;
                User.read(userCookie.id).then(() => {
                    setUserCourses([...User.getCourses()]);
                    setUserCatalog([...User.getPrograms()]);
                });
            })

        getMinors().then(val => setMinors(val));
        getCerts().then(val => setCertificates(val));
        getGenEds().then(val => setGenEds(val));
        return () => controller.abort();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // === Event Handlers === //
    const handleTypeChange = (e, index) => {
        setType(e.target.value);
    };

    const handleCategoryChange = (e, index) => {
        setCategory(e.target.value);
    };

    const handleTermChange = (e, index) => {
        setTerm(e.target.value);
    };

    const handleEnrollFieldChange = (i, e) => {
        let newFormValues = [...enrollFields];
        newFormValues[i][e.target.name] = e.target.value;
        setEnrollFields(enrollFields);
    }

    // this is the user catalog section. this is a list of the type and category that the user has chosen. this is used to loop through database data
    const handleUserCategories = () => {
        User.addPlan(selectCategory, selectTerm, selectType);
        setUserCatalog([...User.getPrograms()])
        setUserCourses([...User.getCourses()])
    }

    const removeCatalog = (category, year, type) => {

        setUserCatalog([...User.removeProgram(category, year, type)]);
    }

    const setCatalog = catalogs => {
        User.setPrograms(catalogs.map(c => ({title: c.category, year: c.year, type: c.type})))
        setUserCatalog([...User.getPrograms()])
        setUserCourses([...User.getCourses()])
    }

    const reformatTitle = title => {
        const split = title.split(/\sin\s/);
        return `${split[1]}${split[0] !== "Minor" && split[0] !== "Certificate" ? ` (${split[0]})` : ""}`;
    }

    const updateCatalog = () => {
        setUserCourses([...User.getCourses()]);
        User.print()
    }

    // this is used to determine the select options based on user's previous choice. if user chooses majors, shows majors, etc.

    let userType = null;
    let options = null;

    if (selectType === "majors") {
        userType = majors
    }
    else if (selectType === "minors") {
        userType = minors
    }
    else if (selectType === "certificates") {
        userType = certificates
    }

    if (selectTerm && userType) {
        options = userType[selectTerm].map((option) => <option key={option?.title} value={option?.title}>{reformatTitle(option?.title)}</option>);
    }



    // this function checks the selected type and category the user has added, filters through the types of lists and then pushes the information into the Catalog Items component. the index is used for deletion purposes.

    const getCourses = (type, category, year, index) => {
        let selectedType = [];
        if (type === "majors" || type === "major") {
            if (!majors[year]) return;
            selectedType = majors[year]
        }
        else if (type === "minors" || type === "minor") {
            if (!minors[year]) return;
            selectedType = minors[year]
        }
        else if (type === "certificates" || type === "certificate") {
            if (!certificates[year]) return;
            selectedType = certificates[year]
        }
        else if (category === "") {
            category = "default"
        }

        return (
            <CatalogItems year={year} type={selectedType} category={category} coursesList={coursesList} removeCatalog={() => removeCatalog(category, year, type)} update={updateCatalog} userCourses={userCourses} />
        )

    }

    const clear = () => {
        User.clear();
        setUserCourses([...User.getCourses()]);
        setUserCatalog([...User.getPrograms()]);
    }

    // === Alert Popups === //
    const deleteAlert = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='confirmButton'>
                        <h1>Confirm Delete</h1>
                        <p>Are you sure you want to delete your progress? There is no way to undo this action.
                            {loggedIn ? " This will not affect your saved data until you click the save button." : ""}</p>
                        <div id="confirmButtonsDiv">
                            <button id="no" onClick={onClose}>No</button>
                            <button id="yes"
                                onClick={() => {
                                    clear();
                                    onClose();
                                }}
                            >
                                Yes
                            </button>
                        </div>

                    </div>
                );
            }
        })
    }

    const saveData = () => {
        if (loggedIn) confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='confirmButton'>
                        <h1>Confirm Save</h1>
                        <p>Are you sure you want to save? This will overwrite any previously saved data.</p>
                        <div id="confirmButtonsDiv">
                            <button id="no" onClick={onClose}>No</button>
                            <button id="yes"
                                onClick={() => {
                                    User.save(userCookie.id);
                                    onClose();
                                }}
                            >
                                Yes
                            </button>
                        </div>

                    </div>
                );
            }
        })
        else confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='confirmButton'>
                        <h1>Not signed in</h1>
                        <p>You are not currently signed in. To save your data you must either sign into an existing account or create a new one.</p>
                        <div id="confirmButtonsDiv">
                            <button id="yes" onClick={() => {
                                onClose();
                                User.tempStorage();
                                navigate('/login');
                            }}>Sign in</button>
                            {/* <button id="signup" onClick={onClose}>Sign up</button> */}
                            <button id="no" onClick={onClose}>
                                Continue without saving
                            </button>
                        </div>

                    </div>
                );
            }
        })
    }


    return (
        <div id="fullpage">
            <div id="header">
                <TranscriptUpload
                    setCatalog={setCatalog}
                    setCourses={(courses) => {
                        User.setCourses(courses);
                        setUserCourses([...User.getCourses()]);
                    }}
                    hasData={userCourses.length > 0} />
                <br />
            </div>
            <div id='contents'>
                <div id="audit">
                    <div id="enrollmentSelection">
                        {/* https://www.youtube.com/watch?v=XtS14dXwvwE */}
                        {enrollFields.map((input, index) => {
                            return (
                                <div key={index} id="addedSectionEnroll">
                                    <label>
                                        Type:&nbsp;&nbsp;
                                        <select name='type' value={input.type} onChange={(e) => { handleTypeChange(e); handleEnrollFieldChange(index, e) }}>
                                            <option value="default"></option>
                                            <option value="majors">Major</option>
                                            <option value="minors">Minor</option>
                                            <option value="certificates">Certificate</option>
                                        </select>
                                    </label>
                                    <label>
                                        Year:&nbsp;&nbsp;
                                        <select name='year' value={input.year} onChange={(e) => { handleTermChange(e); handleEnrollFieldChange(index, e) }}>
                                            <option value="default"></option>
                                            {/* {Object.keys(term).map((key, index) => 
                                            <option value={key}>{term[key]}</option>)} */}

                                            {Object.keys(majors).sort().reverse().map(key => <option key={key} value={key} >{key}</option>)}

                                        </select>
                                    </label>
                                    <label>
                                        Category:&nbsp;&nbsp;
                                        <select name='category' value={input.category} onChange={(e) => { handleCategoryChange(e); handleEnrollFieldChange(index, e) }}>
                                            <option value="default"></option>
                                            {options}
                                        </select>
                                    </label>
                                    <div id="test">
                                        <button id="programButton" onClick={handleUserCategories}>ADD PROGRAM</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <hr />


                    <GenEdsModel key={state} genEds={genEds} coursesList={coursesList} update={updateCatalog} userCourses={userCourses}/>


                    {/* this is a map that gets all user input programs here, user can delete or add programs */}
                    {userCatalog.map((key, index) =>
                        <div key={index}>

                            {getCourses(key.type, key.category, key.year, index)}

                        </div>
                    )
                    }

                    {/* <MajorTest majors={majors} coursesList={coursesList}/> */}

                    <div>
                        <h2 id="auditHeaders">Elective Courses</h2>
                        <p>If you have other courses you have taken that are outside of your major or transfer courses, enter them here:</p>
                        <ul className="accordion">
                            <li>
                                <input type="checkbox" name="accordion" id="elective" />
                                <label id="genReqLabel" htmlFor="elective">Mizzou Courses:</label>
                                <div className="classHistory">

                                    <ExtraCourses key={state} coursesList={coursesList} userCourses={userCourses} update={updateCatalog}/>
                                </div>
                            </li>
                        </ul>

                        <ul className="accordion">
                            <li>
                                <input type="checkbox" name="accordion" id="transfer" />
                                <label id="genReqLabel" htmlFor="transfer">Transfer Courses:</label>
                                <div className="classHistory">

                                    <TransferCourse key={state} update={updateCatalog}/>
                                </div>
                            </li>
                        </ul>

                    </div>


                    <div id='optionButtons'>
                        <button id='deleteButton' onClick={deleteAlert}>DELETE</button>
                        <button id='exportButton' onClick={exportData}>EXPORT</button>
                        <button id='saveButton' onClick={saveData}>SAVE</button>

                    </div>
                </div>
                <hr />

                <SemesterPlan data={userCatalog} courses={userCourses} updateParent={updateCatalog} />
                {/* <PlanPosition/> */}
            </div>
        </div>

    )
};

export default Audit;
