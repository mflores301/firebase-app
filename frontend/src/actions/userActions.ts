// types/constants
import { IUser } from "../models/user";
import { UserActionTypes } from "../constants/userActionsType";

export type UserActions =
  | {
      type: UserActionTypes.UPDATE_USER;
      payload: { id: string; data: Omit<IUser, "id"> };
    }
  | { type: UserActionTypes.API_CALL_INIT }
  | { type: UserActionTypes.API_CALL_END }
  | { type: UserActionTypes.SET_USERS_DATA; payload: Array<IUser> }
  | { type: UserActionTypes.SET_SELECTED_USER; payload: IUser }
  | { type: UserActionTypes.API_SET_ERROR; payload: boolean }
  | { type: UserActionTypes.SET_DETAILS_MODAL; payload: boolean }
  | { type: UserActionTypes.SET_EDIT_MODAL; payload: boolean };
