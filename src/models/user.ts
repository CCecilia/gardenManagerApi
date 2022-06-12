import { Model, Schema, model } from 'mongoose';

import bcrypt from 'bcrypt';

export interface UserInterface {
    email: string;
    password: string,
    accessToken: string,
}

export interface UserMethods {
    comparePassword(candidatePassword: string): boolean
}

export type UserModel = Model<UserInterface, {}, UserMethods>;

export const UserSchema = new Schema<UserInterface, UserModel, UserMethods>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessToken: { type: String, required: true },
});

UserSchema.pre('save', function(): void {
    console.log('pre-save user')
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return;

    // generate a salt
    bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS!), function(err, salt) {
        if (err) {return err}

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {return err}

            user.password = hash;
        })
    });
});

UserSchema.method('comparePassword',async function comparePassword(candidatePassword: string): Promise<boolean> {
    const result = await bcrypt.compare(this.password, candidatePassword);
    return result;
});

export const User = model<UserInterface, UserModel, UserMethods>('User', UserSchema);