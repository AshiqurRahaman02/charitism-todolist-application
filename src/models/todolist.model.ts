import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
	title: string;
	userId: string;
	deadLine: string;
	isCompleted: boolean;
}

const taskSchema = new Schema({
	title: String,
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	deadLine: Date,
	isCompleted: { type: Boolean, default: false },
});

const TaskModel = mongoose.model<ITask>("Task", taskSchema);

export default TaskModel;
