import { User, UserSchema } from "../models/user";

import { MongoServerError } from "mongodb";
import { SignInFormData } from "types/signInFormData.type";
import { TypedRequestBody } from "types/request.interface";
import mongoose from "mongoose";

const jwt = require('jsonwebtoken');

export const signup = async (req: TypedRequestBody<SignInFormData>, res) =>{
  const {email, password} = req.body;

  const user = new User({
    email,
    password,
  });

  const accessToken = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
    expiresIn: 86400 // 24 hours
  });

  user.accessToken = accessToken;

  await user.save().catch((error: MongoServerError) => {
    if (error.code === 11000) {
      res.status(400).return({message: 'email already in use '});
      return;
    }

    res.status(500).return({message: error.errmsg});
  });

  req.session['user'] = user;

  res.setHeader('Content-Type', 'application/json');
  res.status(202).json({
    id: user.id,
    email: user.email,
    accessToken: user.accessToken
  });
};

export const signin = async (req: TypedRequestBody<SignInFormData>, res) =>{
  const {email, password } = req.body;
  console.log()
  const User = mongoose.model('Users', UserSchema);

  const query  = await User.findOne({ email }).exec();

  if (query) {
    const result = await query['comparePassword'](password);
    if (result) {
      res.status(200).json({
        accessToken: query.accessToken
      })
    }
  }

  res.status(400).json({
    message: 'email/password incorrect'
  });
};