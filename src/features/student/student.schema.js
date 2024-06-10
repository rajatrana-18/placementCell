import mongoose from "mongoose";

export const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    batch: {
        type: String,
        required: true
    },

    college: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    DSA: {
        type: Number,
        required: true
    },

    WebDev: {
        type: Number,
        required: true
    },

    React: {
        type: Number,
        required: true
    },


    companyName: {
        type: String,
    },

    Date: {
        type: Date
    },

    result: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Interview'
    }
})

