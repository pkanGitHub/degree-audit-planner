import { useRef } from "react";
import { ReadTranscript } from "../lib/pdfreader.temp";
// https://medium.com/web-dev-survey-from-kyoto/how-to-customize-the-file-upload-button-in-react-b3866a5973d8 


export default function TranscriptUpload() {
    

    const hiddenFileInput = useRef(null);

    const handleClick = event => {
      hiddenFileInput.current.click();
    };

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        handleFile(fileUploaded);
    };

    const handleFile = file => {
        ReadTranscript(file);
    }

    return (
        <>
                <button id="transcriptButton" onClick={handleClick}>Upload Unoffical Transcript</button>
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