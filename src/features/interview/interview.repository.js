import mongoose from "mongoose";

import { interviewSchema } from "./interview.schema.js";
const interviewModel = mongoose.model('Interview', interviewSchema);

export default class InterviewRepository {
    // this function is used to add and return a new interview to the database. 
    async addInterview(data) {
        try {
            const newInterview = new interviewModel(data);
            await newInterview.save();
            return newInterview;
        } catch (err) {
            throw new Error("Something went wrong with the database");
        }
    }

    // this function is used to fetch and return all the data from the InterviewModel database. 
    async getAll() {
        try {
            const allInterviews = await interviewModel.find();
            return allInterviews;
        } catch (err) {
            throw new Error("Something went wrong with the database");
        }
    }


    async getInterviewStudents(name, date) {
        try {
            const allInterviews = await interviewModel.find({ companyName: name, Date: date });
            return allInterviews;
        } catch (err) {
            throw new Error("Something went wrong with the database");
        }
    }



    // this funciton updates the result in the interviewModel database.
    async updateResult(companyName, date, data) {
        try {
            // find the document with the matching companyName and the date and update that particualar collection.
            const updatedInterview = await interviewModel.findOneAndUpdate(
                { companyName: companyName, Date: date },
                { result: data },
                { new: true }
            );
            return updatedInterview;
        } catch (err) {
            throw new Error("Failed to update interview result in the database");
        }
    }



}