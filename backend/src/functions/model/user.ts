// types
import { IUser } from "../../firestore/utilities/interfaces/user";

export type IUpdateUser = Partial<Omit<IUser, "id">>;
