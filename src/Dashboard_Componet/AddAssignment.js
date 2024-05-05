import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const AddAssignment = () => {
    const [pdfBlob, setPdfBlob] = useState(null);
    const [pdf, setPdf] = useState(null)
    const [assignmentTitle, setAssignmentTitle] = useState('');
    const [inputOutputFiles, setInputOutputFiles] = useState([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        // setPdfBlob(event.target.files[0])
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPdfBlob(fileReader.result);
            };
            fileReader.readAsDataURL(file);
            setPdf(file)
        }
    };

    const handleInputOutputFileUpload = (event) => {
        const files = Array.from(event.target.files);
        setInputOutputFiles(files);
    };

    const addAssignment = () => {
        const formData = new FormData();
        formData.append('title', assignmentTitle);
        formData.append('pdfFile', pdf);
    
        // Append each input/output file to the FormData object
        if (Array.isArray(inputOutputFiles)) {
            inputOutputFiles.forEach((file, index) => {
                formData.append(`files`, file);
            });
        } else {
            console.error('inputOutputFiles is not an array');
            return;
        }
    
        fetch('http://127.0.0.1:5000/addAssignment', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Assuming the server returns JSON response
            } else {
                throw new Error('Failed to add assignment');
            }
        })
        .then(data => {
            // Handle success, maybe show a success message
            console.log(data.message);
        })
        .catch(error => {
            // Handle error, maybe show an error message
            console.error('Error:', error.message);
        });
    };
    
    
    return (
        <div className="h-full">
            <div className="h-1/5">
                <div className="my-5 mx-3">
                    <label>Assignment Title : </label>
                    <input type="text" value={assignmentTitle} onChange={(e) => setAssignmentTitle(e.target.value)} />
                </div>
                <div className="my-5 mx-3">
                    <label>Pdf file problem : </label>
                    <input type="file" onChange={handleFileUpload} />
                </div>
                <div className="my-5 mx-3">
                    <label>Input and Output file text : </label>
                    <input type="file" multiple onChange={handleInputOutputFileUpload} />
                </div>
            </div>
            {/* <div className="h-3/5 grid grid-cols-3">
                <div></div>
                <div className="col-span-1 overflow-y-auto px-5 py-5">
                    {pdfBlob && (
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                            <Viewer fileUrl={pdfBlob} />
                        </Worker>
                    )}
                </div>
                <div></div>
            </div> */}
            <div className="h-3/5">
                <button className="bg-red-100 py-4 px-4 hover:bg-green-100" onClick={addAssignment}>Submit</button> 
            </div>
        </div>
    );
};

export default AddAssignment;
