import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	tasks: [string];
}

const userSchema: Schema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
