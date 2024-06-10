import express from 'express';
import StudentController from './student.controller.js';
import basicAuth from '../middlewares/auth.js';

const studentRouter = express.Router();
const studentController = new StudentController();

// route to add a new student to the database. 
studentRouter.post('/add', basicAuth, (req, res, next) => {
    studentController.add(req, res, next)
});

// route to fetch all the students from the database. 
studentRouter.get('/all', basicAuth, (req, res, next) => {
    studentController.getAll(req, res, next)
});

// route to get the page to add a new student.
studentRouter.get('/add', basicAuth, (req, res, next) => {
    studentController.add(req, res, next)
});

export default studentRouter;