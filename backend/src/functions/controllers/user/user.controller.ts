// external imports
import { QuerySnapshot } from "firebase-admin/firestore";
import { context } from "../../../firestore";

// internal imports
// types
import { IUser } from "../../../firestore/utilities/interfaces/user";
import { IUpdateUser } from "../../model/user";
// schema validation
import { userUpdateSchema } from "../../schema/user";
import { IRequest } from "../interfaces/request";
import {
  IErrorResponse,
  IResponse,
  ISuccessResponse,
} from "../interfaces/response";

/**
 * It gets all the users from the database
 * @param {Request} request
 * @param {Response} response
 */
export const getUsers = async (
  request: IRequest<never, { page_size: string; page: string }, never>,
  response: IResponse<
    | ISuccessResponse<{
        users: IUser[];
        size: number;
      }>
    | IErrorResponse
  >
) => {
  try {
    const { query } = request;
    const documents = await context.collection("users").listDocuments();
    const total = documents.length;
    const usersQuery = context
      .collection("users")
      .orderBy("id")
      .startAfter((Number(query.page) - 1) * Number(query.page_size))
      .limit(Number(query.page_size));

    const queryResponse = (await usersQuery.get()) as QuerySnapshot<IUser>;
    const users = queryResponse.docs.map((document) => document.data());

    response.status(200).json({
      success: true,
      data: { users, size: total },
    });
  } catch (error: any) {
    console.error(error);

    response.status(500).json({ success: false, error: error.message });
  }
};

/**
 * It updates a user in the database
 * @param {IRequest<{ id: string }, never, IUpdateUser>} request
 * @param {IResponse<ISuccessResponse<IUser> | IErrorResponse>} response
 */
export const updateUser = async (
  request: IRequest<{ id: string }, never, IUpdateUser>,
  response: IResponse<ISuccessResponse<IUser> | IErrorResponse>
) => {
  const {
    body,
    params: { id: userId },
  } = request;

  const validation = userUpdateSchema.validate(body);
  if (validation.error) {
    response
      .status(400)
      .json({ success: false, error: validation.error.message });
  }

  if (!userId) {
    response.status(400).json({
      success: false,
      error: "Bad Request: User 'id' param is required",
    });
  }

  try {
    await context.collection("users").doc(userId).update(body);
    const updated = (await (
      await context.collection("users").doc(userId).get()
    ).data()) as IUser;

    response.status(201).json({ success: true, data: updated });
  } catch (error: any) {
    console.error(error);
    response.status(500).json({ success: false, error: error.message });
  }
};
