import { Request, Response, NextFunction } from "express";
import TaskModel from "../models/todolist.model";

export const checkUserAuthorization = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.user?._id;
		if (!userId) {
			res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}
		const { taskId } = req.params;
        if(!taskId){
            res.status(500).json({
				isError: true,
				message: "Task Id is required as taskId in parameters",
			});
        }

		const task = await TaskModel.findById(taskId);

		if (!task) {
			return res.status(404).json({
				isError: true,
				message: "Task not found",
			});
		}

		console.log(task,userId);
		if (task.userId.toString() !== userId.toString()) {
			return res.status(403).json({
				isError: true,
				message:
					"Unauthorized. You do not have permission to perform this action.",
			});
		}

		next();
	} catch (error) {
		res.status(500).json({
			isError: true,
			message: "Internal Server Error",
			error,
		});
	}
};
