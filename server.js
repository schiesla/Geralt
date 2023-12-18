import express from 'express';
import { PORT } from './config.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/userRoute.js';
import bodyParser from 'body-parser';
import { authorizeJWT } from './middleware/authMiddleware.js';

dotenv.config();

const mongoString = process.env.DATABASE_URL;
const option = {
  socketTimeoutMS: 30000
};

mongoose.connect(mongoString, option);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
});

database.once('connected', () => {
  console.log('Database Connected');
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(authorizeJWT);

app.use('/api', router);

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

