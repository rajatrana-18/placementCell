import mongoose from "mongoose";

import { StudentSchema } from "./student.schema.js";
import { interviewSchema } from "../interview/interview.schema.js";

const StudentModel = mongoose.model('Student', StudentSchema);
const interviewModel = mongoose.model('Interview', interviewSchema);

export default class StudentRepository {

    // this function is used to add  a new student to the database and return the new student. 
    async addStudent(data) {
        try {
            const newStudent = new StudentModel(data);
            await newStudent.save();
            return newStudent;
        } catch (err) {
            throw new Error("Something went wrong");
        }
    }

    // this function is used to return all the students from the database.
    async getAll() {
        try {
            const getStudents = await StudentModel.find();
            return getStudents;
        } catch (err) {
            throw new Error("Something went wrong");
        }
    }


    // async getAllResults() {
    //     try {
    //         const result = await interviewModel.find();
    //         const result1 = await StudentModel.find();
    //     } catch (err) {
    //         throw new Error("Something went wrong");
    //     }
    // }


    // async getAllResults() {
    //     try {
    //         const interviewResults = await interviewModel.find();
    //         const studentResults = await StudentModel.find();

    //         const interviewResultDictionary = {}
    //         interviewResults.forEach(interview => {
    //             if (interview.result === undefined) {
    //                 interviewResultDictionary[interview.nameID] = "Did not attempt"
    //             } else {
    //                 interviewResultDictionary[interview.nameID] = interview.result;
    //             }

    //         });

    //         studentResults.forEach(student => {

    //         })
    //         console.log(interviewResultDictionary);


    //     } catch (err) {
    //         throw new Error("Something went wrong: " + err.message);
    //     }
    // }

    // async getStudentNames() {
    //     try {
    //         const names = [];
    //         const students = await StudentModel.find();
    //         students.forEach(student => {
    //             names.push(student.name);
    //         });
    //         console.log(names);
    //         return names;
    //     } catch {
    //         throw new Error("Something went wrong");
    //     }
    // }
}