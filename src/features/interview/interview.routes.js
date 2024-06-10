import express from 'express';
import InterviewController from './interview.controller.js';
import basicAuth from '../middlewares/auth.js';
// initialise the express router.
const interviewRouter = express.Router();
// create an instance of interviewController
const interviewController = new InterviewController();


// Route handlers.
// route to get all the interviews.
interviewRouter.get('/all', basicAuth, (req, res, next) => {
    interviewController.getAll(req, res, next)
});

// route to update the result of an interview.
interviewRouter.post('/all', basicAuth, (req, res, next) => {
    interviewController.update(req, res, next)
})


// rotue to create a new interview.
interviewRouter.post('/add', basicAuth, (req, res, next) => {
    interviewController.add(req, res, next)
});


// route to get the add interview page.
interviewRouter.get('/add', basicAuth, (req, res, next) => {
    interviewController.add(req, res, next)
});

// route to get the external jobs.
interviewRouter.get('/jobs', basicAuth, (req, res, next) => {
    interviewController.getJobs(req, res, next)
});

// route to update the result of a particular interview.
interviewRouter.post('/:companyName', basicAuth, (req, res, next) => {
    interviewController.getInterviewStudents(req, res, next)
});

// route to get all the students appearing for a particular interview.
interviewRouter.get('/:companyName', basicAuth, (req, res, next) => {
    interviewController.getInterviewStudents(req, res, next)
});

export default interviewRouter;