import express from 'express';
import EmployeeController from './user.controller.js';

// initialise the express router.
const employeeRouter = express.Router();
// create an instance of EmployeeController
const employeeController = new EmployeeController();

// Route handlers.

// route to get the sign up page
employeeRouter.get('/signup', (req, res, next) => {
    employeeController.signUp(req, res, next)
});

// route to register a new user
employeeRouter.post('/signup', (req, res, next) => {
    employeeController.signUp(req, res, next)
});

// route to get the signin page
employeeRouter.get('/signin', (req, res, next) => {
    employeeController.signIn(req, res, next)
});

// route to login a user
employeeRouter.post('/signin', (req, res, next) => {
    employeeController.signIn(req, res, next)
});

employeeRouter.get("/logout", (req, res, next) => {
    employeeController.logout(req, res, next)
});

export default employeeRouter;