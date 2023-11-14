import { useRef } from "react";
import { GetInfo } from "../lib/pdfreader.temp";
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