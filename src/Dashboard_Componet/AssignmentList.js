import Popup from "reactjs-popup";
import AddAssignment from "./AddAssignment";
const Assignment = () =>{
    let assignments = ["IsPrime","F","Test"]
    return(
        <div className="w-full h-4/5 flex flex-col items-center">
            <h1 className="my-5  text-3xl">Assignment</h1>
            <div className="w-full h-full overflow-y-auto">
                {assignments.map((element, index) =>
                    <div key={index} className="w-4/5 mx-auto py-5 text-blue-500 px-5 my-2 border-2 border-blue-500 hover:bg-blue-500 hover:text-white" 
                    // onClick={() => toAssignment(element)}
                    >
                        {index + 1 + ".) " + element}
                    </div>
                )}
                
            </div>
            {/* <div className="w-1/5 mx-auto py-5 text-red-500 px-5 my-2 border-2 border-red-500 hover:bg-red-500 hover:text-white text-center">
                    <button >Add Assignment</button>
            </div> */}
            <Popup
                trigger={
                <div className="w-1/5 mx-auto py-5 text-red-500 px-5 my-2 border-2 border-red-500 hover:bg-red-500 hover:text-white text-center">
                    <button >Add Assignment</button>
                </div>}
                modal
                contentStyle={{width: '600px', maxHeight: '400px', padding: '20px' }} // Optional: adjust content style
                overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // Optional: adjust overlay style
                position="center center" // Center the popup on the screen
            >
                {(close) => (
                <div className="modal bg-blue-300 rounded-lg shadow-lg p-4 ">
                    <button className="close absolute top-0 right-0 m-2" onClick={close}>
                    &times;
                    </button>
                    <div className="content">
                    <AddAssignment/>
                    </div>
                </div>
                )}
            </Popup>
        </div>
    );
};

export default Assignment;