import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const AddAssignment = () => {
    const [pdfBlob, setPdfBlob] = useState(null);

    // Assuming 'response' contains the API response with PDF data

    // Code to handle PDF data retrieval and conversion to Blob
    const handlePdfData = (response) => {
        const pdfData = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(pdfData);
        setPdfBlob(url);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPdfBlob(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        }
    };
    // Call handlePdfData with your API response
    // handlePdfData(response);

    return(
        <>
            <div className="h-1/5">
                <div className="my-5 mx-3">
                    <label>Assignment Title : </label>
                    <input type="text" />
                </div>
                <div className="my-5 mx-3">
                    <label>Pdf file problem : </label>
                    <input type="file" onChange={handleFileUpload} />
                </div>
                <div className="my-5 mx-3">
                    <label>Input and Output file text : </label>
                    <input type="file" multiple />
                </div>
            </div>
            <div className="h-4/5 grid grid-cols-2">
                <div className="col-span-1 h-full overflow-y-auto px-5 py-5">
                    {pdfBlob && (
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                            <Viewer fileUrl={pdfBlob} />
                        </Worker>
                    )}
                </div>
            </div>
        </>
    );
};

export default AddAssignment;
