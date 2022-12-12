// external imports
import { QuerySnapshot } from "firebase-admin/firestore";
import { context } from "../../../firestore";

// internal imports
// types
import { IUser } from "../../../firestore/utilities/interfaces/user";
import { paginate } from "../../handlers/pagination";
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
  request: IRequest<never, { page_size?: string; page?: string }, never>,
  response: IResponse<
    | ISuccessResponse<{
        total: number;
        page: number;
        pageSize: number;
        pageTotal: number;
        users: IUser[];
      }>
    | IErrorResponse
  >
) => {
  try {
    const { query } = request;
    const usersSnapshot = (await context
      .collection("users")
      .get()) as QuerySnapshot<IUser>;
    const total = usersSnapshot.size;
    const page = query.page ? +query.page : 1;
    const pageSize = query.page_size ? +query.page_size : total;
    const pageTotal = Math.round(total / pageSize);

    const users = paginate(
      usersSnapshot.docs.map((doc) => doc.data()),
      pageSize,
      page
    );

    response.status(200).json({
      success: true,
      data: { total, page, pageSize, pageTotal, users },
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
