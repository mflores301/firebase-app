import { IUser } from "../../firestore/utilities/interfaces/user";

export const paginate = (
  array: IUser[],
  pageSize: number,
  page: number
): IUser[] => {
  return array.slice((page - 1) * pageSize, (page * pageSize));
};
