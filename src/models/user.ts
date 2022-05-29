import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface UserInterface {
    name: string;
    email: string;
    password: string
}

export const userSchema = new Schema<UserInterface>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

userSchema.pre('save', function(): void {
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

userSchema.methods.comparePassword = function(candidatePassword: string, cb: (err?: Error, isMatch?: boolean) => boolean) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(undefined, isMatch);
    });
};