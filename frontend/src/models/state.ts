import { IUser } from "./user";

export interface IPagination{
  pageSize: number
  page: number;
  size: number;
}

export interface MainState {
  users: Array<IUser>;
  loading: boolean;
  error: boolean;
  selectedUser?: IUser;
  openDetails: boolean
  openEdit: boolean;
  pagination: IPagination
}

export const INITIAL_STATE: MainState = {
  loading: false,
  error: false,
  users: [],
  openDetails: false,
  openEdit: false,
  pagination:{
    page: 1,
    pageSize: 10,
    size: 10
  }
};
