const AddAssignment = () => {
    return(
        <>
            <div>
                <label>Assignment Title : </label>
                <input type="text" />
            </div>
            <div>
                <label>Pdf file problem : </label>
                <input type="file"/>
            </div>
            <div>
                <label>Input and Output file text : </label>
                <input type="file" multiple/>
            </div>
        </>
    );
};

export default AddAssignment;