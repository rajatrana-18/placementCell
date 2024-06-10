import mongoose from "mongoose";
export const interviewSchema = new mongoose.Schema({
    nameID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Student'
    },

    name: {
        type: String
    },

    companyName: {
        type: String,
        required: true
    },

    Date: {
        type: Date,
        required: true
    },

    result: {
        type: String,
        enum: ['Pass', 'Fail', 'On-Hold', 'Did not attempt']
    }
})
