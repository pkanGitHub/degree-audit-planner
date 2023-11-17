import "../styles/audit.css";
import CatalogItems from "../components/catalog";
import { useState, useEffect } from "react";
import GenEdsModel from "../components/genEds";
import ExtraCourses from "../components/extraCourses";
import TransferCourse from "../components/transferCourses";
import SemesterPlan from "../components/semesterplan";
import { getCerts, getCourseList, getGenEds, getMajors, getMinors } from "../lib/data";
import TranscriptUpload from "../components/transcriptUpload";

const Audit = () => {

    const [userCredits, setUserCredits] = useState(0);
    const [userCreditsNeeded, setUserCreditsNeeded] = useState(0);
    const [userCreditsRemaining, setUserCreditsRemaining] = useState(0);
    const [userCreditsElectives, setUserCreditsElectives] = useState(0);
    const [userCreditsGenEds, setUserCreditsGenEds] = useState(0);
    const [userCreditsMajor, setUserCreditsMajor] = useState(0);
    const [userCreditsMinor, setUserCreditsMinor] = useState(0);
    const [userCreditsCertificate, setUserCreditsCertificate] = useState(0);
    const [userCreditsTransfer, setUserCreditsTransfer] = useState(0);

    const [selectType, setType] = useState("");
    const handleTypeChange = (e, index) => {
        setType(e.target.value);
    };

    const [selectCategory, setCategory] = useState("");
    
    const handleCategoryChange = (e, index) => {
        setCategory(e.target.value);
    };

    const [selectTerm, setTerm] = useState("");
    const term = {
        FS21: "Fall 2021",
        SP22: "Spring 2022",
        SM22: "Summer 2022",
    };
    const handleTermChange = (e, index) => {
        setTerm(e.target.value);
    };


    
    // testing add function! this is applied to the mass select, will need to get this to work on the top and other select course
    const [enrollFields, setEnrollFields] = useState([{type: "", category: "", year: ""}])
    
    const handleEnrollFieldChange = (i, e) =>{
        let newFormValues = [...enrollFields];
        newFormValues[i][e.target.name] = e.target.value;
        setEnrollFields(enrollFields);
    }

    

    // gets database data and turns it into a list of objects

    const [minors, setMinors] = useState([]);
    const [majors, setMajors] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [coursesList, setCourses] = useState([]);
    const [genEds, setGenEds] = useState([])

    useEffect(() => {
        getMajors(true).then(val => setMajors(val));
        getMinors(true).then(val => setMinors(val));
        getCerts(true).then(val => setCertificates(val));
        getCourseList(true).then(val => setCourses(val));
        getGenEds(true).then(val => setGenEds(val));
    }, []);


    // this is the user catalog section. this is a list of the type and category that the user has chosen. this is used to loop through database data

    const [userCatalog, setUserCatalog] = useState([{type: "", category: ""}])

    const handleUserCategories = () => {
       setUserCatalog([...userCatalog, {type: selectType, category: selectCategory}])

    }

    const removeCatalog = (index) =>{
        let data = [...userCatalog]
        data.splice(index, 1)
        setUserCatalog(data)
    }
    
    const addCatalog = (type, category) => {
        setUserCatalog([...userCatalog, {type: type, category: category}])
    }

    // this is used to determine the select options based on user's previous choice. if user chooses majors, shows majors, etc.

    let userType = null;
    let options = null;
    let yearOptions = null;

    if (selectType === "majors"){
        userType = majors
    }
    else if (selectType === "minors"){
        userType = minors
    }
    else if (selectType === "certificates"){
        userType = certificates
    }

    if (userType) { 
        yearOptions = userType.map(option => <option key={option?.title}>{option?.title}</option>)
        options = userType.map((option) => <option key={option?.title}>{option?.title}</option>); 
    }

/* //------------------------------------------------------------------------------------------
    const calculateUserCredits = () => {

        let credits = 0;
        let creditsNeeded = 0;
        let creditsRemaining = 0;
        let creditsElectives = 0;
        let creditsGenEds = 0;
        let creditsMajor = 0;
        let creditsMinor = 0;
        let creditsCertificate = 0;
        let creditsTransfer = 0;

        let userCredits = 0;
        let userCreditsNeeded = 0;
        let userCreditsRemaining = 0;
        let userCreditsElectives = 0;
        let userCreditsGenEds = 0;
        let userCreditsMajor = 0;
        let userCreditsMinor = 0;
        let userCreditsCertificate = 0;
        let userCreditsTransfer = 0;
        
      
        // calculates credits for each category
        userCatalog.forEach((category) => {
          if (category.type === "majors") {
            const major = majors.find((major) => major.title === category.category);
            creditsMajor += major?.credits || 0;
          } else if (category.type === "minors") {
            const minor = minors.find((minor) => minor.title === category.category);
            creditsMinor += minor?.credits || 0;
          } else if (category.type === "certificates") {
            const certificate = certificates.find((cert) => cert.title === category.category);
            creditsCertificate += certificate?.credits || 0;
          }
        });
      
        // calculates credits for gen eds
        genEds.forEach((genEd) => {
          if (genEd.type === "genEds") {
            creditsGenEds += genEd.credits || 0;
          }
        });
      
        // calculates credits for electives
        creditsElectives += userCredits - creditsMajor - creditsMinor - creditsCertificate - creditsGenEds - creditsTransfer;
      
        // calculates credits needed
        creditsNeeded += creditsGenEds + creditsMajor + creditsMinor + creditsCertificate;
      
        // calculates credits remaining
        creditsRemaining += creditsNeeded - userCredits;
      
        // calculates credits from transfer courses
        creditsTransfer += userCreditsTransfer || 0;
      
        return {
          credits,
          creditsNeeded,
          creditsRemaining,
          creditsElectives,
          creditsGenEds,
          creditsMajor,
          creditsMinor,
          creditsCertificate,
          creditsTransfer,
        };
      };
      
      // useEffect for initial load and updates
      useEffect(() => {
        const {
          credits,
          creditsNeeded,
          creditsRemaining,
          creditsElectives,
          creditsGenEds,
          creditsMajor,
          creditsMinor,
          creditsCertificate,
          creditsTransfer,
        } = calculateUserCredits();
      
        setUserCredits(credits);
        setUserCreditsNeeded(creditsNeeded);
        setUserCreditsRemaining(creditsRemaining);
        setUserCreditsElectives(creditsElectives);
        setUserCreditsGenEds(creditsGenEds);
        setUserCreditsMajor(creditsMajor);
        setUserCreditsMinor(creditsMinor);
        setUserCreditsCertificate(creditsCertificate);
        setUserCreditsTransfer(creditsTransfer);
      }, [userCatalog, userCredits, userCreditsNeeded, userCreditsRemaining, userCreditsElectives, userCreditsGenEds, userCreditsMajor, userCreditsMinor, userCreditsCertificate, userCreditsTransfer]);
      
       
      const calculateCategoryCredits = (categoryItem, type) => {
        if (type === "majors") {
          return categoryItem?.credits || 0;
        } else if (type === "minors") {
          return categoryItem?.credits || 0;
        } else if (type === "certificates") {
          return categoryItem?.credits || 0;
        }
        return 0;
      };


      //------------------------------------------------------------------------------------------ */
    
      // this function checks the selected type and category the user has added, filters through the types of lists and then pushes the information into the Catalog Items component. the index is used for deletion purposes.
    
    function getCourses(type, category, index){
        let selectedType = [];
        if (type === "majors"){
            selectedType = majors
        }
        else if (type === "minors"){
            selectedType = minors
        }
        else if (type === "certificates"){
            selectedType = certificates
        }
        else if (category === ""){
            category = "default"
        }

        //const selectedItem = selectedType.find((item) => item.title === category);
        return(
            <CatalogItems type={selectedType} category={category} coursesList={coursesList} removeCatalog={() => removeCatalog(index)}/>
        ) 
        /* return (
            <div key={index}>
              <CatalogItems type={selectedType} category={category} coursesList={coursesList} removeCatalog={() => removeCatalog(index)} />
              <div>Total Credits for {category}: {calculateCategoryCredits(selectedItem, type)}</div>
            </div>
          ); */
    }
    
    
        return (
        <body id="fullpage">
            <div id="header">
                <TranscriptUpload set={addCatalog}/>
                <br/>
                <a href="/tutorial" target="_blank">Need Help?</a>
            </div>
            <div id='contents'>
            
                <div id="audit">

                    <div id="enrollmentSelection">
                        {/* https://www.youtube.com/watch?v=XtS14dXwvwE */}
                        {enrollFields.map((input, index) => {
                            return(
                                <div key={index} id="addedSectionEnroll">
                                    <label>
                                        Type:
                                        <select name='type' value={input.type} onChange={(e) => {handleTypeChange(e); handleEnrollFieldChange(index, e)}}>
                                            <option value="default"></option>
                                            <option value="majors">Major</option>
                                            <option value="minors">Minor</option>
                                            <option value="certificates">Certificate</option>
                                        </select>
                                    </label>
                                    <label>
                                        Category:
                                        <select name='category' value={input.category} onChange={(e)=> {handleCategoryChange(e); handleEnrollFieldChange(index, e)}}>
                                            <option value="default"></option>
                                            { options }
                                        </select>
                                    </label>
                                    
                                    <label>
                                        Year:
                                        <select name='year' value={input.year} onChange={(e)=>{handleTermChange(e); handleEnrollFieldChange(index, e)}}>
                                            <option value="default"></option>
                                            {Object.keys(term).map((key, index) => 
                                            <option value={key}>{term[key]}</option>)}
                                        </select>
                                    </label>
                                    {/* <button onClick={()=>removeEnrollFields(index)}>Delete</button> */}
                                </div>
                            )
                        })}
                        <button onClick={handleUserCategories}>Add Program</button>
                    </div>
                    <hr/>
                    
                    <GenEdsModel genEds={genEds} coursesList={coursesList}/>

            
                    {/* this is a map that gets all user input programs here, user can delete or add programs */}
                    { userCatalog.map((key, index) =>
                        <div key={index}>

                            { getCourses(key.type, key.category, index) }    
            
                        </div>
                        )
                    }

                    {/* <MajorTest majors={majors} coursesList={coursesList}/> */}

                    <div>
                        <h2>Elective Courses</h2>
                        <p>If you have other courses you have taken that are outside of your major or transfer courses, enter them here:</p>
                        <ul className="accordion">
                            <li>
                                <input type="checkbox" name="accordion" id="elective" />
                                <label id="genReqLabel" htmlFor="elective">Mizzou Courses:</label>
                                <div className="classHistory">

                                    <ExtraCourses coursesList={coursesList}/>
                                </div>
                            </li>
                        </ul>

                        <ul className="accordion">
                            <li>
                                <input type="checkbox" name="accordion" id="transfer" />
                                <label id="genReqLabel" htmlFor="transfer">Transfer Courses:</label>
                                <div className="classHistory">

                                    <TransferCourse/>
                                </div>
                            </li>
                        </ul>

                    </div>


                    <div id='optionButtons'>
                        <button id='saveButton'>Save</button>
                        <button id='exportButton'>Export</button>
                        <button id='deleteButton'>Delete</button>
                    </div>
                </div>
                <hr/>

                <SemesterPlan data={userCatalog}/>

            </div>
        </body>
       
    )
};

export default Audit;
