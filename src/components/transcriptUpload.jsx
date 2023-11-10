import { useRef } from "react";
import { ReadTranscript } from "../lib/pdfreader.temp";
// var pdfUtil = require('pdf-to-text');
// import * as pdfUtil from 'pdf-to-text'
// https://medium.com/web-dev-survey-from-kyoto/how-to-customize-the-file-upload-button-in-react-b3866a5973d8 

import { useState } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import * as PDFWorker from 'pdfjs-dist/build/pdf.worker.mjs'
import{ saveAs } from 'file-saver';
import { GetInfo } from "../lib/pdfreader.temp";
// import * as PDFParse from '../../node_modules/pdf-parse/lib/pdf-parse'

export default function TranscriptUpload(props) {

    GlobalWorkerOptions.workerSrc = PDFWorker;

    const [userData, setUserData] = useState(null);
    
    const hiddenFileInput = useRef(null);

    const handleClick = event => {
      hiddenFileInput.current.click();
    };

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        GetInfo(fileUploaded).then(data => props.set(data.Major.split("-")[0]));
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