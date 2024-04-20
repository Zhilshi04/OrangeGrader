import { useState } from "react";
import AddAssignmentComponent from "./component/AddAssignment"; // Renamed component

const Dashboard = () => {
    const [showAddAssignment, setShowAddAssignment] = useState(false); // Renamed state variable

    return (
        <div className="w-full h-dvh bg-red-100 grid grid-cols-6 ">
            <div className="col-span-1 bg-[#8B93FF] flex flex-col items-center" >
                <div className="w-full h-10 hover:bg-[#1C1678] bg-[#5356FF] text-white text-center " onClick={() => { setShowAddAssignment(true) }}>
                    Assignment
                </div>
                {/* <div className="w-full h-10 hover:bg-[#1C1678] bg-[#5356FF] text-white text-center ">
                    User
                </div> */}
            </div>
            <div className="col-span-5 bg-blue-100 h-dvh">
                {showAddAssignment && <AddAssignmentComponent />} {/* Changed component name */}
            </div>
        </div>
    );
};

export default Dashboard;
