import "../styles/audit.css";
import RequiredChoice from "../components/requiredChoice";
import RequiredCourse from "../components/requiredCourse";
import ClassInfo from "../components/classInfoPopup";
import { useState } from "react";

const Audit = () => {
  const [selectCourseType, setCourseType] = useState("");
  const handleSelect = (e) => {
    setCourseType(e.target.value);
  };

  const [selectType, setType] = useState("");
  const typeOptions = ["Major", "Minor", "Certificate"];
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const [selectCategory, setCategory] = useState("");
  const category = {
    INFOTC: "Information Technology - BS",
    BIOMED: "Biomedical Engineering - BMEBS",
    COMPS: "Computer Science - BS",
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const [selectTerm, setTerm] = useState("");
  const term = {
    FS21: "Fall 2021",
    SP22: "Spring 2022",
    SM22: "Summer 2022",
  };
  const handleTermChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <body id="fullpage">
      <div>
        <button className="transcriptButton">Upload Unofficial Transcript</button>
        <br />
        <a href="/tutorial">Need Help?</a>
      </div>
      <div id="audit">
        <div id="enrollmentSelection">
          <label>
            Type:
            <select name="type" onChange={handleTypeChange}>
              {typeOptions.map((typeOption) => (
                <option value={typeOption}>{typeOption}</option>
              ))}
            </select>
          </label>

          <label>
            Category:
            <select name="type" onChange={handleCategoryChange}>
              {Object.keys(category).map((key, index) => (
                <option value={key}>{category[key]}</option>
              ))}
            </select>
          </label>

          <label>
            Catalog Year:
            <select name="type" onChange={handleTermChange}>
              {Object.keys(term).map((key, index) => (
                <option value={key}>{term[key]}</option>
              ))}
            </select>
          </label>
          <hr />
        </div>

        <ul className="accordion">
          <li>
            <input type="checkbox" name="accordion" id="first" />
            <label id="genReqLabel" htmlFor="first">General Requirements</label>
            <div className="classHistory">
                <p>Math (5/5)</p>
                <RequiredCourse />
                <RequiredCourse />
                <p>English (3/6)</p>
                <RequiredCourse />
            </div>
          </li>
        </ul>

        <hr />

        <ul className="accordion">
          <li>
            <input type="checkbox" name="accordion" id="second" />
            <label id="genReqLabel" htmlFor="second">General Electives</label>
            <div className="classHistory">
                <RequiredChoice />
                <RequiredChoice />
                <RequiredChoice />
                <RequiredChoice />
            </div>
          </li>
        </ul>

        <div id="largeClassSelect">
          <label>
            Course type:
            <select id="chooseCourseType" onChange={handleSelect}>
              <option value="BIO">Biology</option>
              <option value="AGR">Agriculture</option>
              <option value="INT">International Studies</option>
              <option value="MCE">Mechanical Engineering</option>
            </select>
          </label>
          {/* will want to find a way to pass information through to the pop up, will have to use query based on selection above*/}
          <p>Choose from {selectCourseType} courses below:</p>
          <div id="popupDiv">
            <ClassInfo />
            <ClassInfo />
            <ClassInfo />
            <ClassInfo />
            <ClassInfo />
            <ClassInfo />
            <ClassInfo />
            <ClassInfo />
            <ClassInfo />
            <ClassInfo />
            <ClassInfo />
            <ClassInfo />
            <ClassInfo />
            <ClassInfo />
            <ClassInfo />
            <ClassInfo />
          </div>
        </div>
      </div>
    </body>
  );
};

export default Audit;
