import express from 'express';
import { PORT } from './config.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/user.js';
dotenv.config();

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

const app = express();
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

