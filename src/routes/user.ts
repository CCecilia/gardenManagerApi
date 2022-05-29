import express from 'express';

export const userRoutes = express.Router();

userRoutes.route("/user/create/").get((_req, res) => {
    console.log('/user/create/');
    res.status(200).send('OK');
});