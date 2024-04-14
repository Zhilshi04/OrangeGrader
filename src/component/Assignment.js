import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const Assignment = ({ assignment }) => {
    const [pdfBlob, setPdfBlob] = useState(null);
    const [type, setType] = useState('cpp');
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('');
    const [score, setScore] = useState('');
    const [pdfUrl, setPdfUrl] = useState('');
    const [pdf,setPdf] = useState(null)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalTest, setTotalTest] = useState(0);
    const [reload,setReload] = useState(false)

    useEffect(() => {
        const fetchPdfData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/pdf/${assignment}`, 
                {responseType: 'arraybuffer'});

                if (response.status === 200) {
                    console.log(response.data)
                    const pdfData = new Blob([response.data], { type: 'application/pdf' });
                    const url = URL.createObjectURL(pdfData)
                    console.log(url);
                    setPdfBlob(url);
                } else {
                    console.error('Failed to fetch PDF data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching PDF data:', error);
            }
        };

        fetchPdfData();
    }, [assignment]);
    


    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const uploadFile = async () => {
        try {
            const formData = new FormData();
            formData.append('assignment', assignment);
            formData.append('type', type);
            formData.append('file', file);
            

            const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                setReload(true)
                setStatus('File uploaded successfully!');
                setScore(response.data.score);
                setTotalTest(response.data.total_tests);
            } else {
                setStatus('Failed to upload file.');
            }
        } catch (error) {
            setStatus('Failed to upload file.');
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="w-full h-full grid grid-cols-2 items-center">
            <div className="col-span-1  h-full overflow-y-auto px-5 py-5">
                    {pdfBlob && (
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                            <Viewer fileUrl={pdfBlob} />
                        </Worker>
                    )}
            </div>
            <div className="col-span-1 mx-20   h-full">
                <h1 className="text-2xl mb-4 my-10">Assignment Uploader</h1>
                <div>
                    <label className="block mb-2" htmlFor="assignment">Assignment:{assignment}</label>
                </div>
                <div>
                    <label className="block mb-2" htmlFor="type">Select Type:</label>
                    <select
                        id="type"
                        className="block border border-gray-300 rounded px-4 py-2 mb-4"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="py">Python</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2" htmlFor="file">Choose File:</label>
                    <input
                        type="file"
                        id="file"
                        accept=".c, .cpp, .py, .java"
                        className="mb-4"
                        onChange={(e) => {setFile(e.target.files[0]);setReload(false);setStatus('');setScore('');setTotalTest(0)}}
                    />
                </div>
                <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={uploadFile}
                >
                    Upload File
                </button>
                <p id="status" className="mt-4">{status}</p>
                {reload && <p id="score">{score}/10</p>}
            </div>
        </div>
    );
};

export default Assignment;
