import { get, handleAPIError, post } from "src/api/requests";

import type { APIResult } from "src/api/requests";

export type User = {
  _id: string;
  name: string;
  profilePictureURL?: string;
};

/**
 * The expected inputs when we want to create a new Task object. In the MVP, we only
 * need to provide the title and optionally the description, but in the course of
 * this tutorial you'll likely want to add more fields here.
 */
export type CreateUserRequest = {
  name: string;
  profilePictureURL?: string;
};

/**
 * The expected inputs when we want to update an existing Task object. Similar to
 * `CreateTaskRequest`.
 */
export type UpdateUserRequest = {
  _id: string;
  name: string;
  profilePictureURL?: string;
};

/**
 * The implementations of these API client functions are provided as part of the
 * MVP. You can use them as a guide for writing the other client functions.
 */
export async function createUser(user: CreateUserRequest): Promise<APIResult<User>> {
  try {
    const response = await post("/api/user", user);
    const json = (await response.json()) as User;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function getUser(id: string): Promise<APIResult<User>> {
  try {
    const response = await get(`/api/user/${id}`);
    const json = (await response.json()) as User;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function getAllUsers(): Promise<APIResult<User[]>> {
  try {
    // your code here
    const response = await get("/api/users");
    const json = (await response.json()) as User[];
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
/*
export async function updateUser(user: UpdateUserRequest): Promise<APIResult<User>> {
  try {
    // your code here
    const response = await put(`/api/user/${user._id}`, user);
    const json = (await response.json()) as User;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}
*/
