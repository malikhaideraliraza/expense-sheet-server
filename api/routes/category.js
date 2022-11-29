import express from 'express';

//controllers
import categoryController from '../controllers/category';

const router = express.Router();

export default (db) => {

    const controllersFuncs = categoryController(db);

    //getExpenses
    router.get('/', controllersFuncs.getCategories);

    return router;
};
