from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import subprocess
import os
from dotenv import load_dotenv
import pymongo
import bcrypt
load_dotenv()

url_db = os.getenv("URL_DB")

client = pymongo.MongoClient(url_db)

db = client["User_info"]
collection = db["user"]

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
                    output = output.replace("\n","")
                    expected_output = expected_output.replace("\n","")
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


@app.route('/addUser', methods=['POST'])
def add_user():
    # Get user data from the request body
    user_data = request.json

    # Check if required fields are present in the request
    if 'username' not in user_data or 'email' not in user_data or 'password' not in user_data:
        return jsonify({'error': 'Missing required fields'}), 400

    # Hash the password before storing it
    hashed_password = bcrypt.hashpw(user_data['password'].encode('utf-8'), bcrypt.gensalt())

    # Replace the plain text password with the hashed password
    user_data['password'] = hashed_password.decode('utf-8')

    # Insert the user data into the MongoDB collection
    result = collection.insert_one(user_data)

    # Get the length of the collection after insertion
    user_id = collection.count_documents({})

    # Check if the insertion was successful
    if result.inserted_id:
        return jsonify({'message': 'User added successfully', 'user_id': user_id}), 201
    else:
        return jsonify({'error': 'Failed to add user'}), 500




@app.route('/getAllUser', methods=['GET'])
def get_all_user():
    users = list(collection.find())  # Retrieve all users from the collection
    return jsonify(users)  # Return the users as a JSON response


# client.close()
if __name__ == '__main__':
    app.run(debug=True)
