import express from 'express';

//controllers
import expenseController from '../controllers/expense';

const router = express.Router();

export default (db) => {

    const controllersFuncs = expenseController(db);

    //getExpenses
    router.get('/', controllersFuncs.getExpensesOfUser);

    //addExpense
    router.post('/', controllersFuncs.addExpense);

    //remove by id
    router.delete('/:exId', controllersFuncs.deleteExpenseById);

    return router;
};
