import React, { useState } from 'react';
import axios from 'axios';
import AssignmentList from './component/AssignmentList';
import Assignment from './component/Assignment';
const App = () => {
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const assingmentList = ["IsPrime","Fibonacci Number","Pyramid"]

    const toAssignment = (assignment) => {
        setSelectedAssignment(assignment); // Update the selected assignment when clicked
    }

    const toAssignmentList = () => {
        setSelectedAssignment(null)
    }

    return (
        <div className="w-full h-screen grid grid-rows-12">
            <header className="bg-[#ED7D31] w-full row-span-1 flex justify-around items-center ">
                <h1 className="text-white text-2xl">Orange Grader</h1>
                <div className="text-white hover:cursor-pointer px-10 h-full flex items-center justify-center hover:bg-white hover:text-[#ED7D31]" onClick={toAssignmentList}>
                    Task
                </div>
                <div className="text-white">NULL</div>
                <div className="text-white bg-white w-10 h-10 rounded-full"></div>
            </header>
            <div className="w-full row-span-11">
                {selectedAssignment ? (
                    <Assignment assignment={selectedAssignment} />
                ) : (
                    <AssignmentList assignments={assingmentList} toAssignment={toAssignment} />
                )}
                {/* <div className="bg-[#ED7D31] w-full h-1/5"></div> */}
            </div>
        </div>
    );
};

export default App;
