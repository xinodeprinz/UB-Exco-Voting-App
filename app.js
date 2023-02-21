import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import router from './src/router.js';
import jsonErrorHandler from 'express-json-error-handler';
import upload from "express-fileupload";
import { handleErrors } from './src/middlewares.js';
import dbConfig from './src/database/config.js';

config();
dbConfig();

const { PORT } = process.env;

const app = express();

app.use(cors())
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(upload());
app.use(router)
app.use(jsonErrorHandler());
app.use(handleErrors)

app.listen(PORT, () => console.log(`Server started localhost:${PORT}`))