import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone"
import { useCallback } from 'react';
import { GetInfo } from "../lib/filehandling";
import { Course } from "../lib/course";
import "../styles/transcriptUpload.css"
import { getProgramsBySearch } from "../lib/data";
import TermsCondition from "./termsConditions";
import { confirmAlert } from "react-confirm-alert";
// https://medium.com/web-dev-survey-from-kyoto/how-to-customize-the-file-upload-button-in-react-b3866a5973d8 
// https://spacejelly.dev/posts/uploading-files-in-react-from-a-form-with-drag-and-drop/

export default function TranscriptUpload({setCatalog, setCourses, hasData}) {    

    // === State Variables === //
    const [uploadedFile, setFile] = useState(null);
    const [hideModal, setHidden] = useState(true);
    const [preview, setPreview] = useState(null);
    const [userConsents, setConsent] = useState(false);
    const [error, setError] = useState(null);
    const [programs, setPrograms] = useState([]);
    const [overwrite, setOverwrite] = useState(false);

    // === Variables from React Dropzone === //
    // const onDrop = 

    const { getRootProps, getInputProps, isDragActive } = useDropzone(
        { onDrop: 
            useCallback((acceptedFiles) => {
                setFile(acceptedFiles[0]);
                setPreview(acceptedFiles[0].name)
                setError(null);
            }, [])
        }
    );

    const consentCheck = e => {
        setConsent(e.target.checked);
    }

    const readFile = e => {
        if (uploadedFile === null) {
            setError("Please upload a file.")
            return;
        };
        GetInfo(uploadedFile).then(data => {
            console.log(data);
            addPrograms(data.Programs);
            setCourses(Object.entries(data.CourseWork)
                                .map(term => {
                                        const formatted = term[0].split("_");
                                        formatted[0] = (() => {
                                            switch (formatted[0]) {
                                                case "SPNG":
                                                    return 0;
                                                case "SUM":
                                                    return 1;
                                                case "FALL":
                                                    return 2;
                                                default: 
                                                    return 3;
                                            }
                                        })();
                                        return [formatted, term[1], term[0]];
                                })
                                .sort((a, b) => {
                                    
                                    const aT = a[0]
                                    const bT = b[0];

                                    if (aT[1] > bT[1]) return 1;
                                    if (aT[1] < bT[1]) return -1;
                                        
                                    if (aT[0] > bT[0]) return 1;
                                    if (aT[0] < bT[0]) return -1;
                                    
                                    return 0;
                                })
                                .reduce((([total, year, prevSem, semCnt], semester) => { 
                                    
                                    if (semester[0][0] === 2 ^ semester[0][0] <= prevSem && prevSem !== 2) {
                                        year++;
                                        semCnt = 0;
                                    }
                                    total.push(...semester[1].map(id => {
                                        id = id.split(":");
                                        
                                        const course = new Course(id[0], year, semCnt, id[1])
                                        if (id[2] && id[2] === "inProgress") course.inProgress();
                                        else course.completed();
                                        return course;
                                    }));          
                                    return [total, year, semester[0][0], ++semCnt]; 
                                }), [[], -1, 3, 0])
                                [0])
            // closeModal(null);
        })
        .catch(error => {
            console.error(error);
            setError("Please upload accepted file.");
        });;
        // .then(data => props.set("Major", data.Major.split("-")[0]));
    }

    const addPrograms = programs => {
        const list = programs.map(program => {
            var [name, type] = program.title.split("-");
            const search = getProgramsBySearch(name, program.year, undefined);
            return {original: program.title, year: program.year, results: search}
        })

        setPrograms(list);
    }

    const finalize = e => {
        e.preventDefault();
        const selects = e.target.getElementsByTagName("select");
        const values = Array.from(selects).map(s => s.value)

        setCatalog(
            values.map(v => {
                const program = programs.find(p => p.results.find(r => r.title === v));
                return {type: program.results.find(r => r.title === v).type, category: v, year: program.year};
        }));
        closeModal("close");
    }

    const openModal = () => {
        setHidden(false)
        document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    }

    const closeModal = e => {
        if (e != null && e !== "close" && e.target.id !== "uploadModal" && e.target.id !== "close" && e.target.id != "no") return;
        setHidden(true);
        setConsent(false);
        setFile(null);
        setPreview(null);
        setError(null);
        setOverwrite(false);
        setPrograms([]);
        document.getElementsByTagName("body")[0].style.overflowY = "scroll"; 
    }

    const MainContent = () => {
        if (!overwrite) setOverwrite(true);
        return (
            <div id="modalContent">
                <h3>Upload your file here:</h3>
                <span id="close">X</span>
                <div {...getRootProps()} id="fileDrop">
                    <input {...getInputProps()} />
                    {
                        preview ? 
                        <>
                            <p>&nbsp;</p>
                            <p>{ preview }</p>
                            <p>&nbsp;</p>
                        </> 
                        :
                        isDragActive ?
                        <>
                            <p>&nbsp;</p>
                            <p>Drop the files here ...</p>
                            <p>&nbsp;</p>
                        </>
                            :
                        <>
                            <p>Drag files here</p>
                            <p>or</p>
                            <p>Click to select files</p>
                        </>
                    }
                </div>
                <a href="/tutorial#uploading">What can I upload?</a>
                <div id="consent">
                    <input type="checkbox" name="consentCheck" onChange={consentCheck}/>
                    <p>I consent to the collection and processing of essential information and understand it will be handled confidentially, used solely for the intended purpose.</p>
                </div>
                <button type="button" disabled={!userConsents} onClick={readFile}>Upload</button>
                { error ? <p className="error">{ error }</p> : <p>&nbsp;</p> }
                
            </div>
        )
    }

    const PostProcess = () => {
        return (
            <div id="modalContent">
                <h3>
                    We were able to recognize the following programs.
                </h3>
                <form id="foundPrograms" onSubmit={finalize}>
                { programs.map(program => (
                    <>
                        <p>{ program.original } | { program.year }</p>
                        { program.results.length > 1 ?
                            <select>
                                { program.results?.map(result => (
                                    <option>{result.title}</option>
                                ))}
                            </select>
                        : 
                            <span style={{fontSize: "small"}}>We were unable to recognize the above program and it must be added manually.</span>
                        }
                    </>
                ))}
                <br></br>
                <button type="submit">
                    Finalize
                </button>
                </form>
            </div>
        )
    }

    const PreWarning = () => {
        return (
            <div id="modalContent">
                <h3>Uploading a file will overwrite your current plan</h3>
                <button onClick={() => setOverwrite(true)}>
                    Continue
                </button>
                <button onClick={() => closeModal("close")}>
                    Cancel
                </button>
            </div>
        )
    }


    const TermsAlert = () => {
        
        return (
            <div className='confirmButton'>
            <h1>Upload Notice</h1>
            <p>By clicking Yes, you are agreeing to the <TermsCondition/>. If you do not agree, hit no and return to the audit page.</p>
                    
            <div id="confirmButtonsDiv">
                <button id="no" onClick={closeModal}>No</button>
                <button id="yes"
                onClick={() => {
                    setConsent(true);
                }}
                >
                Yes
                </button>
            </div>
            
            </div>
        );
    }

    return (
        <>
            <button id="transcriptButton" onClick={openModal}>UPLOAD UNOFFICIAL TRANSCRIPT</button>
            { hideModal ? null :        
                <div id="uploadModal" onClick={closeModal}>
                { !userConsents ? 
                    TermsAlert()
                :
                hasData && !overwrite ? 
                    PreWarning()
                : programs.length === 0 ? 
                    MainContent()
                :
                    PostProcess()
                }
                </div>
            }

        </>
    )
}
