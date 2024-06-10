import express from 'express';
import CSVController from './csv.controller.js';
import basicAuth from '../middlewares/auth.js';

const csvRouter = express.Router();
const csvController = new CSVController();

csvRouter.get('/', basicAuth, (req, res, next) => {
    csvController.getData(req, res, next)
});


export default csvRouter;