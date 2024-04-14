const AssignmentList = ({ assignments, toAssignment }) => {
    return (
        <div className="w-full h-4/5 flex flex-col items-center">
            <h1 className="my-5  text-3xl">Assignment</h1>
            <div className="w-full h-full overflow-y-auto">
                {assignments.map((element, index) =>
                    <div key={index} className="w-4/5 mx-auto py-5 px-5 my-2 border-2 border-[#ED7D31] hover:bg-[#ED7D31] hover:text-white" onClick={() => toAssignment(element)}>
                        {index + 1 + ".) " + element}
                    </div>
                )}
            </div>
        </div>
    );
};
export default AssignmentList;
