import InterviewRepository from "./interview.repository.js";
import StudentRepository from "../student/student.repository.js";
export default class InterviewController {
    constructor() {
        this.interviewRepository = new InterviewRepository();
        this.StudentRepository = new StudentRepository();
    }

    // function to get all the companies whose interviews have been assigned to the students.
    async getAll(req, res, next) {
        try {
            const getAllInterviews = await this.interviewRepository.getAll();
            // this data is passed to the interviews.ejs file which will render this information.
            res.render("interviews", { getAllInterviews });
        } catch (err) {
            res.status(400).send("Something went wrong");
        }
    }

    // this function is used to get all the students appearing for a particular interview based on the company name and the date of interview.
    async getInterviewStudents(req, res, next) {
        try {
            const companyName = req.params.companyName;
            const { date } = req.query;
            if (req.method == "GET") {
                // if it is a get request, render interviewStudents.ejs file with all the names of the students appearing for that particular interview.
                const students = await this.interviewRepository.getInterviewStudents(companyName, date);
                res.render("interviewStudents", { students });
            } else {
                // if it is a POST request, update the result of that particular interview.
                const { result } = req.body
                const updateResult = await this.interviewRepository.updateResult(companyName, date, result);
                res.status(200).redirect(`/api/interviews/${encodeURIComponent(companyName)}?date=${encodeURIComponent(date)}`);

            }
        } catch (err) {
            res.status(400).send("Something went wrong");
        }
    }

    // this function is used to add a new interview.
    // select the student and enter the company name and the data of interview.
    async add(req, res, next) {
        try {
            // render the addInterview.ejs file on a GET request. 
            if (req.method == "GET") {
                const studentNames = await this.StudentRepository.getAll();
                res.render("addInterview", { studentNames });
            } else {
                // add a new interview to the database if it is a POST request.
                const newInterview = await this.interviewRepository.addInterview(req.body);
                if (newInterview) {
                    // upon successful submission it will render the page which contains all the interviews.
                    res.status(200).redirect("/api/interviews/all");
                } else {
                    res.status(400).send("New interview not added")
                }
            }
        } catch (err) {
            res.status(400).send("Something went wrong");
        }
    }

    // this function is used to update the result of an interview taken by a student. 
    async update(req, res, next) {
        const interviewId = req.body.interviewId;
        const result = req.body.result;
        console.log(result, interviewId)
        try {
            const updatedInterview = await this.interviewRepository.updateResult(interviewId, result);
            res.status(200).redirect("/api/interviews/all");
        } catch (err) {
            res.status(400).send("Failed to update interview result");
        }
    }


    async getJobs(req, res, next) {
        try {
            res.render("externalJobs");
        } catch (err) {
            res.status(400).send("Something went wrong");
        }
    }
}