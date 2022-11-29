import express from 'express';

//routes
import UserRouter from './user';
import ExpenseRouter from './expense';
import CategoryRouter from './category';

//middlewares
import { authenticate } from '../middlewares/auth';

const router = express.Router();

export default (db) => {

    //public routes
    router.use('/', UserRouter(db));

    //private routes
    router.use('/app/ex', authenticate, ExpenseRouter(db));
    router.use('/app/cat', authenticate, CategoryRouter(db));

    return router;
};
