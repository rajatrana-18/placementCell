import express from 'express';
import JobsController from './jobs.controller.js';
import basicAuth from '../middlewares/auth.js';
const jobsRouter = express.Router();
const jobsController = new JobsController();

// route to get external jobs page.
jobsRouter.get('/github', basicAuth, (req, res, next) => {
    jobsController.getJobsPage(req, res, next)
})
export default jobsRouter;