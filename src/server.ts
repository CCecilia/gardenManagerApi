const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const { getDatabaseUri } = require('./utilities/database');
const user = require('./routes/user');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

mongoose.connect(getDatabaseUri())
    .then(()=> console.log('Database Connected'))
    .catch((error) => console.error(error));

const app = express();

app.use(cors({
    origin: ['http://localhost:3000']
}));

app.use(session({secret: process.env.SESSION_SECRET}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.post('/users/signup/', user.signup);
app.post('/users/signin/', user.signin);

app.listen(process.env.PORT, function() {
    console.log("Server is running on Port: " + process.env.PORT);
});