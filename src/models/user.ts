import { Model, Schema, model } from 'mongoose';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// const jwt = require('jsonwebtoken');

export interface IUser {
  email: string;
  password: string;
  accessToken: string;
}

export interface UserMethods {
  comparePassword(candidatePassword: string): boolean;
}

export type UserModel = Model<IUser, {}, UserMethods>;

export const UserSchema = new Schema<IUser, UserModel, UserMethods>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accessToken: { type: String, required: true },
});

UserSchema.pre('save', function (next): void {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return;

  // generate a salt
  bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS!), function (err, salt) {
    if (err) {
      return err;
    }

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return err;
      }

      user.password = hash;

      next();
    });
  });
});

UserSchema.method(
  'comparePassword',
  async function comparePassword(candidatePassword: string): Promise<boolean> {
    const result = await bcrypt.compare(candidatePassword, this.password);
    return result;
  }
);

UserSchema.method(
  'refreshAccessToken',
  async function refreshAccessToken(): Promise<void> {
    const user = this;
    const newToken = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET!, {
      expiresIn: 86400, // 24 hours
    });

    user.accessToken = newToken;
  }
);

export const User = model<IUser, UserModel, UserMethods>('User', UserSchema);
