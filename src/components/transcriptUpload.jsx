import { useRef } from "react";
import { ReadTranscript } from "../lib/pdfreader.temp";
// var pdfUtil = require('pdf-to-text');
// import * as pdfUtil from 'pdf-to-text'
// https://medium.com/web-dev-survey-from-kyoto/how-to-customize-the-file-upload-button-in-react-b3866a5973d8 

import { useState } from 'react';
import { getDocument, GlobalWorkerOptions, getPages } from 'pdfjs-dist';
import * as PDFWorker from 'pdfjs-dist/build/pdf.worker.mjs'

export default function TranscriptUpload() {

    GlobalWorkerOptions.workerSrc = PDFWorker;

    const [pdfContent, setPdfContent] = useState('');
    

    const hiddenFileInput = useRef(null);

    const handleClick = event => {
      hiddenFileInput.current.click();
    };

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        handleFile(fileUploaded);
    };

    const handleFile = file => {
        const reader = new FileReader();

        // const x = prdfe.get(1);
    
        reader.onload = async (e) => {
          const contents = e.target.result;
        //   console.log(contents)
          const pdfloading = getDocument(contents);

          console.log(pdfloading);

          pdfloading.promise.then(pdf => {
            console.log(pdf.numPages);
            const numPages = pdf.numPages;
            let allTextContent = [];
      
            // Iterate through each page
            for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
              // eslint-disable-next-line no-loop-func
              pdf.getPage(pageNumber).then(page => {
                const textContentPromise = page.getTextContent();
                textContentPromise.then(pageTextContent => {
                    console.log(pageTextContent);

                    const text = pageTextContent.items.map(item => item.transform[5]);
                    console.log(text.join(","));

                  allTextContent = allTextContent.concat(pageTextContent.items);
                  
                  // If this is the last page, set the state with all text content
                  if (pageNumber === numPages) {
                    setPdfContent(allTextContent);
                    console.log(allTextContent);
                  }
                });
              });
            }
          });




        //   const pages = getPages(pdf);
        //   let extractedText = '';
    
        //   for (const page of pages) {
        //     const textContent = await page.getTextContent();
        //     const pageText = textContent.items.map((item) => item.str).join(' ');
        //     extractedText += pageText;
        //   }

        //   console.log(extractedText);
    
        //   setPdfContent(extractedText);
        }
        reader.readAsArrayBuffer(file);
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