import { User } from '../models/user';

import { MongoServerError } from 'mongodb';
import { SignInFormData } from 'types/signInFormData.type';
import { TypedRequestBody } from 'types/request.interface';
import { ISignUpFormData } from 'types/signUpFormData.interface';

const jwt = require('jsonwebtoken');

export const signup = async (req: TypedRequestBody<ISignUpFormData>, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password.length < 8 || confirmPassword.length < 8) {
    return res.status(400).json({
      success: false,
      userData: {},
      message: 'password incorrect',
    });
  };

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      userData: {},
      message: 'password and confirm do not match',
    });
  };

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
    } else {
      errmsg = error.message;
      errCode = 400;
    }
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
  const query: any = await User.findOne({ email }).exec();

  if (query) {
    const result = await query.comparePassword(password);
    query.refreshAccessToken();
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(200)
        .json({
          success: true,
          userData: query,
          message: 'successful sign in'
        });
    }
  }

  return res.status(400).json({
    success: false,
    userData: {},
    message: 'email/password incorrect',
  });
};
