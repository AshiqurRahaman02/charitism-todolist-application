import { Request, Response } from "express";

import TaskModel, { ITask } from "../models/todolist.model";
import UserModel, { IUser } from "../models/user.model";

const getTasks = async (userId: string) => {
	const userTasks = await TaskModel.find({ userId });

	return userTasks || [];
};

export const getUserTasks = () => {
	async (req: Request, res: Response) => {
		try {
			const userId = req.user?._id;
			if (!userId) {
				res.status(500).json({
					isError: true,
					message: "Internal Server Error",
				});
			}

			const userTasks = await getTasks(userId);

			res.status(201).json({ isError: false, tasks: userTasks });
		} catch (error) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
				error,
			});
		}
	};
};
export const createTask = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}
		const { title, deadline } = req.body;
		const newTask = new TaskModel({
			title,
			userId,
			deadline,
		});
		const savedTask = await newTask.save();

		// Update the user's tasks array
		await UserModel.findByIdAndUpdate(userId, {
			$push: { tasks: savedTask._id },
		});

		const userTasks = await getTasks(userId);

		res.status(201).json({
			isError: false,
			message: "Task Created Successfully",
			tasks: userTasks,
		});
	} catch (error) {
		res.status(500).json({
			isError: true,
			message: "Internal Server Error",
			error,
		});
	}
};

export const updateTask = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const { taskId } = req.params;
		const { title, deadline, isCompleted } = req.body;

        

		const updatedTask = await TaskModel.findByIdAndUpdate(
			taskId,
			{ title, deadline, isCompleted },
			{ new: true }
		);

		if (!updatedTask) {
			return res.status(404).json({
				isError: true,
				message: "Task not found",
			});
		}

		const userTasks = await getTasks(userId);

		res.status(201).json({
			isError: false,
			message: "Task Updated Successfully",
			tasks: userTasks,
		});
	} catch (error) {
		res.status(500).json({
			isError: true,
			message: "Internal Server Error",
			error,
		});
	}
};

export const deleteTask = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}

		const { taskId } = req.params;

		const deletedTask = await TaskModel.findByIdAndDelete(taskId);

		if (!deletedTask) {
			return res.status(404).json({
				isError: true,
				message: "Task not found",
			});
		}

		await UserModel.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });

		const userTasks = await getTasks(userId);

		res.status(201).json({
			isError: false,
			message: "Task Deleted Successfully",
			tasks: userTasks,
		});
	} catch (error) {
		res.status(500).json({
			isError: true,
			message: "Internal Server Error",
			error,
		});
	}
};
