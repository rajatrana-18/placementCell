import mongoose from "mongoose";

const csvSchema = new mongoose.Schema({
    StudentId: String,
    Name: String,
    College: String,
    Status: String,
    DSA: String,
    WebDev: String,
    React: String,
    InterviewDate: Date,
    InterviewCompany: String,
    Result: String
})

export default csvSchema;