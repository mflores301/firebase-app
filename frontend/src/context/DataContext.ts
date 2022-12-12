// external imports
import { createContext, Dispatch } from "react";

// internal imports
// actions
import { UserActions } from "../actions/userActions";
// models
import { MainState } from "../models/state";

export interface ContextProps {
  state: MainState;
  dispatch: Dispatch<UserActions>;
}

export const DataContext = createContext<ContextProps>({} as ContextProps);
