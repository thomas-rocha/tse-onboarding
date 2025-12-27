import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import UserModel from "src/models/task";
import validationErrorParser from "src/util/validationErrorParser";

import type { RequestHandler } from "express";

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
    // the newly created task is sent back to the user
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

    res.status(200).json(user);
  } catch (error) {
    // pass errors to the error handler
    next(error);
  }
};
