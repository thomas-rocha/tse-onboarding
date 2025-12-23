import TaskModel from "src/models/task";

import type { RequestHandler } from "express";

export const getAllTasks: RequestHandler = async (req, res, next) => {
  try {
    // your code here
    const result = await TaskModel.find().sort({ dateCreated: -1 });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
