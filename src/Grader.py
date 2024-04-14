import subprocess
import os

def grader(fileName, typeFile, assignmentTitle):
    compile_command = {"cpp": ["g++", f"{fileName}.cpp", "-o", fileName],
                       "java": ["javac", f"{fileName}.java"]}
    run_command = {"cpp": [f"./{fileName}"],
                   "java": [f"java", fileName],
                   "py": ["python", f"{fileName}.py"]}

    # Compile the program 
    if typeFile in compile_command:
        compile_process = subprocess.run(compile_command[typeFile], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    count = 0
    error_message = ""
    for z in range(1, 3):
        with subprocess.Popen(run_command[typeFile], stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                              stderr=subprocess.PIPE, text=True) as process:
            # Provide input to the program
            input_file = os.path.abspath(f"../assignment/{assignmentTitle}/input{z}.txt")
            output_file = os.path.abspath(f"../assignment/{assignmentTitle}/output{z}.txt")
            with open(input_file, "r") as i, open(output_file, "r") as o:
                input_data = i.read().strip()
                expected_output = o.read().strip()
                process.stdin.write(input_data)
                output, error = process.communicate()
                error_message = error

            if output.strip() == expected_output.strip():
                count += 1
    return {"score": count, "total_tests": 2, "assignment": assignmentTitle}

# print({"pass":count,"error":error_message})

# filename = "example"
# typeFile = "java"
# assignment_title = "IsPrime"


# # Call the grader function
# print(grader(filename, typeFile, assignment_title))