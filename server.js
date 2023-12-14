import express from 'express';
import { PORT } from './config.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/userRoute.js';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';

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

app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

app.use('/api', router);

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

