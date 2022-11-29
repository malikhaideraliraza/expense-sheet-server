import express from 'express';
import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import routes from '../api/routes';

export const initServer = (db) => {
    const app = express();

    // parse body params and attache them to req.body
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // gzip compression
    app.use(compress());

    // secure apps by setting various HTTP headers
    app.use(helmet());

    // enable CORS - Cross Origin Resource Sharing
    app.use(cors());

    //mount api
    app.use('/api', routes(db));

    //Test end point
    app.get('/test', (req, res) => res.json({
        error: false,
        message: "Server is up!"
    }));

    app.listen(process.env.PORT, () => console.log(`server started on port ${process.env.PORT} (${process.env.ENVIROMENT})`));
}
