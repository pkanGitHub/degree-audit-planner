import { useRef } from "react";
import { GetInfo } from "../lib/pdfreader.temp";
import TermsCondition from "./termsConditions";
import { confirmAlert } from "react-confirm-alert";
// https://medium.com/web-dev-survey-from-kyoto/how-to-customize-the-file-upload-button-in-react-b3866a5973d8 

export default function TranscriptUpload(props) {    
    const hiddenFileInput = useRef(null);

    const handleClick = event => {
    
        hiddenFileInput.current.click();
            
    };

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        GetInfo(fileUploaded).then(data => props.set("Major", data.Major.split("-")[0]));
    };


    const termsAlert = () => {
        
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                  <div className='confirmButton'>
                    <h1>Upload Notice</h1>
                    <p>By clicking Yes, you are agreeing to the <TermsCondition/>. If you do not agree, hit no and return to the audit page.</p>
                            
                    <div id="confirmButtonsDiv">
                        <button id="no" onClick={onClose}>No</button>
                        <button id="yes"
                        onClick={() => {
                            handleClick();
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

    return (
        <>
            <button id="transcriptButton" onClick={termsAlert}>Upload Unoffical Transcript</button>
            <input
                type="file" 
                id="uploadFile"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{display: 'none'}}
            />
        </>
    )
}