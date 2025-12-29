/**
 * Functions that process task route requests.
 */

import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import UserModel from "src/models/user";
import validationErrorParser from "src/util/validationErrorParser";

import type { RequestHandler } from "express";

// Define a custom type for the request body so we can have static typing
// for the fields
type CreateUserBody = {
  name: string;
  profilePictureURL?: string;
};

export const createUser: RequestHandler = async (req, res, next) => {
  // extract any errors that were found by the validator
  const errors = validationResult(req);
  const { name, profilePictureURL } = req.body as CreateUserBody;

  try {
    // if there are errors, then this function throws an exception
    validationErrorParser(errors);

    const user = await UserModel.create({
      name,
      profilePictureURL,
    });

    // 201 means a new resource has been created successfully
    // the newly created user is sent back to the user
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    // if the ID doesn't exist, then findById returns null
    const user = await UserModel.findById(id);

    if (user === null) {
      throw createHttpError(404, "User not found.");
    }

    // Set the status code (200) and body (the user object as JSON) of the response.
    // Note that you don't need to return anything, but you can still use a return
    // statement to exit the function early.
    res.status(200).json(user);
  } catch (error) {
    // pass errors to the error handler
    next(error);
  }
};
/*
type UpdateTaskBody = {
  _id: string;
  title: string;
  description: string;
  isChecked: boolean;
  dateCreated: string;
};

export const updateTask: RequestHandler = async (req, res, next) => {
  // your code here
  const errors = validationResult(req);
  const { _id, title, description, isChecked, dateCreated } = req.body as UpdateTaskBody;
  const reqid = req.params.id;
  try {
    // your code here
    validationErrorParser(errors);

    if (_id !== reqid) {
      res.status(400);
    } else {
      const result = await TaskModel.findByIdAndUpdate(reqid, {
        _id,
        title,
        description,
        isChecked: !isChecked,
        dateCreated,
      });
      if (result) {
        const updated = await TaskModel.findById(reqid);
        res.status(200).json(updated);
      } else {
        res.status(404);
      }
    }
  } catch (error) {
    next(error);
  }
};
*/
