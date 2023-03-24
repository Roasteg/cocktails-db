import mongoose from "mongoose";

interface IUser {
    username: string;
    password: string;
}

interface IUserDoc extends mongoose.Document {
    username: string;
    password: string;
}

interface IUserModel extends mongoose.Model<IUserDoc> {
    build(credentials: IUser): IUserDoc;
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        requried: true
    }
})

userSchema.statics.build = (credentials: IUser) => {
    return new User(credentials);
}

const User = mongoose.model<IUserDoc, IUserModel>('User', userSchema);

export { User, IUser };