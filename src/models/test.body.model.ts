import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
	body: any
}

const userSchema: Schema = new Schema({
 body: { type: Object },
});

const TryBodyModel = mongoose.model<IUser>("Try-body", userSchema);

export default TryBodyModel;
