import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// mongodb connection url
const url = "mongodb+srv://rajatrana000018:UajPjSNUvr0wFZra@cluster0.b2jnaoe.mongodb.net/employeeDB?retryWrites=true&w=majority&appName=Cluster0";
// connect to mongodb using mongoose
export const connectUsingMongoose = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Mongodb connected using mongoose");
    } catch (err) {
        // log an error msg if the connection fails.
        console.log("Error while connecting to db");
        console.log(err);
    }
}
