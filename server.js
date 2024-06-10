import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import session from 'express-session'
import { connectUsingMongoose } from './src/config/mongoose.js';
import templateAuth from './src/features/middlewares/template.auth.js';
import employeeRouter from './src/features/employee/user.routes.js';
import studentRouter from './src/features/student/student.routes.js';
import interviewRouter from './src/features/interview/interview.routes.js';
import ejsLayouts from 'express-ejs-layouts';
import csvRouter from './src/features/csv/csv.routes.js';
import jobsRouter from './src/features/interview/jobs.routes.js';

// Initialize Express application
const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
// Middleware to parse JSON data
server.use(bodyParser.json());

// Middleware to handle session management
server.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Set EJS as the template engine
server.set("view engine", "ejs");
// setting the directory path.
server.set("views", path.join(path.resolve(), 'src', 'features', 'views'));
server.use(ejsLayouts);

server.use(templateAuth);
// Routes handler
server.use("/api", employeeRouter);
server.use("/api/interviews", interviewRouter);
server.use("/api/students", studentRouter);
server.use("/api/jobs", jobsRouter);
server.use("/api/csv", csvRouter);

// application is listenint at port 5000
server.listen(5000, () => {
    console.log("server is listening at 5000");
    connectUsingMongoose();     // connect to the mongodb server
});