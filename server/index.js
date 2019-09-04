import express from 'express';
import router from './routes/index';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as route from './constants/routes';
import mongoose from 'mongoose';
import io from './socket/io'

const port = 3001;
const urlClient = 'http://localhost:3000';
const app = express();

mongoose.connect(`mongodb://localhost:27017/taskList`,{useNewUrlParser: true});

if(mongoose.connection.readyState){
    app.use(cors({allowedOrigins: [`${process.env.APP_HOST}:${process.env.CLIENT_PORT}`]}));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use( (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', urlClient);

        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        res.setHeader('Access-Control-Allow-Credentials', true);

        next();
    });

    app.use(route.ROOT, router);
    const server = app.listen(port, () => console.log('Server is working'));
    io.attach(server);
    
} else {
    console.log("mongodb disconnected")
}


