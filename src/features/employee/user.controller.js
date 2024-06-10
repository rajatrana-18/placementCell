import EmployeeRepository from "./user.repository.js";
import StudentController from "../student/student.controller.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class EmployeeController {
    constructor() {
        this.employeeRepository = new EmployeeRepository();
    }

    // function to register a new user.
    async signUp(req, res, next) {
        try {
            console.log("signup server hit")
            // get the signup page on a GET request.
            if (req.method == "GET") {
                res.render("signup");
            } else {
                const { name, email, password } = req.body;
                const hashedPassword = await bcrypt.hash(password, 12);    // hashing the password.
                // register a new user on a POST request.
                const empData = await this.employeeRepository.signUp(name, email, hashedPassword);
                if (empData) {
                    res.render("signin")
                } else {
                    res.status(400).send("User already exists");
                }
            }
        } catch (err) {
            console.log(err);
            res.status(400).send("Something went wrong")
        }
    }


    async signIn(req, res, next) {
        try {
            // get the sign in page on a GET request.
            if (req.method == "GET") {
                res.render("signin");
            } else {
                // If it is POST request, validate the credentials and login the user.
                const { email, password } = req.body;
                const user = await this.employeeRepository.signIn(email);
                if (user) {
                    const result = await bcrypt.compare(password, user.password)
                    if (result) {
                        // store the user id in a session variable for authentication purpose.
                        req.session.userID = user._id;
                        res.status(200).redirect("/api/students/all");
                    } else {
                        res.send("Incorrect credentials")
                    }
                } else {
                    res.status(400).send("User does not exist");
                }
            }
        } catch (err) {
            res.status(400).send("Something went wrong");
        }
    }


    // This function is used to log out the user and destroy the session.
    async logout(req, res, next) {
        try {
            req.session.destroy((err) => {
                if (err) res.status(401).send(err);
                else res.redirect("/api/signin");
            });
        } catch (err) {
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }
}