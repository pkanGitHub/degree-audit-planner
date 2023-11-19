import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone"
import { useCallback } from 'react';
import { GetInfo } from "../lib/pdfreader.temp";
import { concatCourses, addMajor } from "../lib/user";
import { Course } from "../lib/course";
import "../styles/transcriptUpload.css"
// https://medium.com/web-dev-survey-from-kyoto/how-to-customize-the-file-upload-button-in-react-b3866a5973d8 
// https://spacejelly.dev/posts/uploading-files-in-react-from-a-form-with-drag-and-drop/

export default function TranscriptUpload({set, setCourses}) {    

    // === State Variables === //
    const [uploadedFile, setFile] = useState(null);
    const [hideModal, setHidden] = useState(true);
    const [preview, setPreview] = useState(null);
    const [userConsents, setConsent] = useState(false);
    const [error, setError] = useState(null);

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
            addMajor(data.Major);
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
                                }), [[], -1, 3, 0]))

            setFile(null);
            setPreview(null);
        })
        .catch(error => {
            console.error(error);
            setError("Please upload accepted file.");
        });;
        // .then(data => props.set("Major", data.Major.split("-")[0]));
    }

    const openModal = () => {
        setHidden(false)
        document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    }

    const closeModal = e => {
        if (e.target.id !== "uploadModal" && e.target.id !== "close") return;
        setHidden(true);
        setConsent(false);
        setFile(null);
        setPreview(null);
        setError(null);
        document.getElementsByTagName("body")[0].style.overflowY = "scroll";
    }
    

    return (
        <>
            <button id="transcriptButton" onClick={openModal}>Upload Unoffical Transcript</button>
            { hideModal ? null :        
                <div id="uploadModal" onClick={closeModal}>
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
                </div>
            }

        </>
    )
}