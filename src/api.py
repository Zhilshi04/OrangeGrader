from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = '../file/'  # Updated upload folder path
PDF_FOLDER = '../pdf_assignment/'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['PDF_FOLDER'] = PDF_FOLDER


def grader(fileName, typeFile, assignmentTitle):
    print(fileName)
    print(typeFile)
    fileName = "../file/" + fileName
    compile_command = {"cpp": ["g++", f"{fileName}.cpp", "-o", fileName],
                       "java": ["javac", f"{fileName}.java"]}
    run_command = {"cpp": [f"./{fileName}"],
                   "java": [f"java", fileName],
                   "py": ["python", f"{fileName}.py"]}

    # Compile the program
    if typeFile in compile_command:
        compile_process = subprocess.run(compile_command[typeFile], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if compile_process.returncode != 0:
                    return {"error": compile_process.stderr.decode("utf-8")}

    count = 0
    error_message = ""
    for z in range(1, 11):
        try:
            with subprocess.Popen(run_command[typeFile], stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                                  stderr=subprocess.PIPE, text=True) as process:
                input_file = os.path.abspath(f"../assignment/{assignmentTitle}/input{z}.txt")
                output_file = os.path.abspath(f"../assignment/{assignmentTitle}/output{z}.txt")
                with open(input_file, "r") as i, open(output_file, "r") as o:
                    input_data = i.read().strip()
                    expected_output = o.read().strip()
                    process.stdin.write(input_data)
                    output, error = process.communicate()
                    error_message = error
                    if output[-1] == "\n" or output[-1] == '\n':
                         output = output[:-1]
                    # print("Output:")
                    # print(output)
                    # print(" ")
                    # print("Result:")
                    # print(expected_output)
                    # print(" ")

                if output.strip() == expected_output.strip():
                    count += 1
        except FileNotFoundError as e:
            return {"error": str(e)}

    return {"score": count, "total_tests": 10, "assignment": assignmentTitle}

@app.route('/upload', methods=['POST'])
def upload_file():
    # Check if the POST request has the file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        filename = file.filename
        typeFile = request.form['type']  # Get the file type from the form
        assignment = request.form['assignment']
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        filename = filename.split('.')[0]
        print(filename)
        print(typeFile)
        # Call the grader function
        result = grader(filename, typeFile, assignment)
        print(result)
        return jsonify(result)  # Return the result of the grader function

@app.route('/pdf/<filename>')
def get_pdf(filename):
    try:
        filename = filename + ".pdf"
        pdf_path = os.path.join(app.config['PDF_FOLDER'], filename)
        if os.path.exists(pdf_path):
            return send_file(pdf_path, as_attachment=True), 200
        else:
            return jsonify({'error': 'PDF file not found'}), 404
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500





if __name__ == '__main__':
    app.run(debug=True)
