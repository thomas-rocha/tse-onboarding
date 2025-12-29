/**
 * Functions that process task route requests.
 */

import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import TaskModel from "src/models/task";
import validationErrorParser from "src/util/validationErrorParser";

import type { RequestHandler } from "express";

/**
 * This is an example of an Express API request handler. We'll tell Express to
 * run this function when our backend receives a request to retrieve a
 * particular task.
 *
 * Request handlers typically have 3 parameters: req, res, and next.
 *
 * @param req The Request object from Express. This contains all the data from
 * the API request. (https://expressjs.com/en/4x/api.html#req)
 * @param res The Response object from Express. We use this to generate the API
 * response for Express to send back. (https://expressjs.com/en/4x/api.html#res)
 * @param next The next function in the chain of middleware. If there's no more
 * processing we can do in this handler, but we're not completely done handling
 * the request, then we can pass it along by calling next(). For all of the
 * handlers defined in `src/controllers`, the next function is the global error
 * handler in `src/app.ts`.
 */
export const getTask: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const task = await TaskModel.findById(id).populate("assignee");

    if (!task) {
      throw createHttpError(404, "Task not found.");
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Define a custom type for the request body so we can have static typing
// for the fields
type CreateTaskBody = {
  title: string;
  description?: string;
  isChecked?: boolean;
  assignee?: string;
};

export const createTask: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const { title, description, isChecked, assignee } = req.body as CreateTaskBody;

  try {
    validationErrorParser(errors);

    const task = await TaskModel.create({
      title,
      description,
      isChecked,
      dateCreated: Date.now(),
      assignee,
    });

    // Populate the assignee before sending response
    const populatedTask = await TaskModel.findById(task._id).populate("assignee");

    res.status(201).json(populatedTask);
  } catch (error) {
    next(error);
  }
};

export const removeTask: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await TaskModel.deleteOne({ _id: id });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

type UpdateTaskBody = {
  _id: string;
  title: string;
  description: string;
  isChecked: boolean;
  dateCreated: string;
  assignee?: string;
};

export const updateTask: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const { _id, title, description, isChecked, dateCreated, assignee } = req.body as UpdateTaskBody;
  const reqid = req.params.id;

  try {
    validationErrorParser(errors);

    if (_id !== reqid) {
      return res.status(400).json({ message: "ID mismatch" });
    }

    const result = await TaskModel.findByIdAndUpdate(
      reqid,
      { title, description, isChecked, dateCreated, assignee },
      { new: true },
    ).populate("assignee");

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    next(error);
  }
};
