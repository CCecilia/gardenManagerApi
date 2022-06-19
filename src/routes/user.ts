import { User, UserSchema } from '../models/user';

import { MongoServerError } from 'mongodb';
import { SignInFormData } from 'types/signInFormData.type';
import { TypedRequestBody } from 'types/request.interface';
import mongoose from 'mongoose';

const jwt = require('jsonwebtoken');

export const signup = async (req: TypedRequestBody<SignInFormData>, res) => {
  const { email, password } = req.body;

  const user = new User({
    email,
    password,
  });

  const accessToken = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
    expiresIn: 86400, // 24 hours
  });

  user.accessToken = accessToken;

  let errmsg;
  let errCode;

  await user.save().catch((error: MongoServerError) => {
    if (error.code === 11000) {
      errmsg = 'email already in use';
      errCode = 400;
    }

    errmsg = error.message;
    errCode = 400;
  });

  if (errmsg && errCode) {
    return res.status(errCode).json({ message: errmsg });
  }

  // eslint-disable-next-line dot-notation
  req.session['user'] = user;

  return res.status(202).json({
    id: user.id,
    email: user.email,
    accessToken: user.accessToken,
  });
};

export const signin = async (req: TypedRequestBody<SignInFormData>, res) => {
  const { email, password } = req.body;
  const User = mongoose.model('Users', UserSchema);
  const query: any = await User.findOne({ email }).exec();

  if (query) {
    const result = await query.comparePassword(password);
    query.refreshAccessToken();
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json({
        id: query.id,
        email: query.email,
        accessToken: query.accessToken,
      });
    }
  }

  return res.status(400).json({
    message: 'email/password incorrect',
  });
};
