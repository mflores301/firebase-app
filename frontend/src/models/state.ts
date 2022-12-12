import { IUser } from "./user";

export interface MainState {
  users: Array<IUser>;
  loading: boolean;
  error: boolean;
  selectedUser?: IUser;
  openDetails: boolean
  openEdit: boolean
}

export const INITIAL_STATE: MainState = {
  loading: false,
  error: false,
  users: [],
  openDetails: false,
  openEdit: false
};
