const express = require('express');

//controller
import userController from '../controllers/user';

const router = express.Router();

export default (db) => {

    const controllersFuncs = userController(db);

    //login
    router.post('/login', controllersFuncs.login);

    //register
    router.post('/register', controllersFuncs.register);

    //getUser by id
    router.get('/', controllersFuncs.getUser);

    return router;
};

