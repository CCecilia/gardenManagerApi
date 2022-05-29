import bodyParser from 'body-parser';
import { config } from 'dotenv';
import cors from 'cors';
import express  from 'express';
import { getDatabaseUri } from './utilities/database';
import mongoose from 'mongoose';
import { userRoutes } from './routes/user';

config()

mongoose.connect(getDatabaseUri())
    .then(()=> console.log('Database Connected'))
    .catch((error) => console.error(error));

const app = express();

app.use(userRoutes);
app.use(cors());
app.use(bodyParser.json());
app.listen(process.env.PORT, function() {
    console.log("Server is running on Port: " + process.env.PORT);
});