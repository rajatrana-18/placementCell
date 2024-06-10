import StudentRepository from './student.repository.js';
import InterviewRepository from '../interview/interview.repository.js';

export default class StudentController {
    constructor() {
        this.studentRepository = new StudentRepository();
        this.interviewRepository = new InterviewRepository();
    }

    // this function is used to get a list of all the students and display on the page. 
    // it renders the students.ejs file.
    async getAll(req, res, next) {
        try {
            const getAllStudents = await this.studentRepository.getAll();
            res.render("students", { getAllStudents });

        } catch (err) {
            res.status(400).send("Something went wrong");
        }
    }

    // this function is used to add a new student.
    async add(req, res, next) {
        try {
            // if it is a GET request, then render the addStudent.ejs file.
            if (req.method == "GET") {
                res.render("addStudent");
            } else {
                // if it is a POST request then add the student to the database. 
                const newStudent = await this.studentRepository.addStudent(req.body);
                if (newStudent) {
                    res.status(200).redirect("/api/students/all");
                } else {
                    res.status(400).send("New student not added");
                }
            }
        } catch (err) {
            res.status(400).send("Something went wrong");
        }
    }

}