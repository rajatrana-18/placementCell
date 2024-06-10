import mongoose from "mongoose";
import createCsvWriter from 'csv-writer';
import csvSchema from "./csv.schema.js";
import { StudentSchema } from "../student/student.schema.js";
import { interviewSchema } from "../interview/interview.schema.js";

const csvModel = mongoose.model('Csv', csvSchema);
const studentModel = mongoose.model('Student', StudentSchema);
const interviewModel = mongoose.model('Interview', interviewSchema);

export default class CSVRepository {
    // this function is used to generate a csv file of the student data. 
    async getData() {
        try {
            // Fetch all interview records
            const interviews = await interviewModel.find();
            const records = [];
            // Iterate through each interview document
            for await (const doc of interviews) {
                const id = doc.nameID;
                // Fetch student details by ID
                const studentDetails = await studentModel.findById(id);
                // Create a record object combining interview and student details
                const record = {
                    StudentId: doc.nameID,
                    Name: doc.name,
                    College: studentDetails.college,
                    Status: studentDetails.status,
                    DSA: studentDetails.DSA,
                    WebDev: studentDetails.WebDev,
                    React: studentDetails.React,
                    InterviewDate: doc.Date,
                    InterviewCompany: doc.companyName,
                    Result: doc.result,

                }
                // Check if the record is already present in the CSV collection
                const isDuplicate = await csvModel.exists({
                    StudentId: doc.nameID,
                    InterviewDate: doc.Date,
                    InterviewCompany: doc.companyName
                });

                // If not a duplicate, save the new record to the CSV collection
                if (!isDuplicate) {
                    const newCSV = new csvModel(record);
                    await newCSV.save();
                }
                // Add the record to the records array
                records.push(record);
            }
            // Write the records to a CSV file
            await this.writeToCSV(records);

        } catch (err) {
            throw new Error("Something went wrong");
        }
    }

    // Function to write records to a CSV file
    async writeToCSV(records) {
        const csvWriter = createCsvWriter.createObjectCsvWriter({
            path: 'output.csv',     // file name
            header: [
                { id: 'StudentId', title: 'StudentId' },
                { id: 'Name', title: 'Name' },
                { id: 'College', title: 'College' },
                { id: 'Status', title: 'Status' },
                { id: 'DSA', title: 'DSA' },
                { id: 'WebDev', title: 'WebDev' },
                { id: 'React', title: 'React' },
                { id: 'InterviewDate', title: 'InterviewDate' },
                { id: 'InterviewCompany', title: 'InterviewCompany' },
                { id: 'Result', title: 'Result' }
            ]
        });
        // Write the records to the specified CSV file
        await csvWriter.writeRecords(records);
    }
}