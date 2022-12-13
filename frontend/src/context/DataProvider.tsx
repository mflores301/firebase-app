// external imports
import {
  FunctionComponent,
  ReactNode,
  useEffect,
  useReducer
} from "react";

// internal imports
import { DataContext } from "./DataContext";
import { INITIAL_STATE } from "../models/state";
import { userReducer } from "../reducers/userReducer";
import { getUsersHandler } from "../handlers/userRequest";

interface ComponentProps {
  children: ReactNode;
}

export const DataProvider: FunctionComponent<ComponentProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  useEffect(() => {
    getUsersHandler(dispatch, state.pagination);
  }, []);

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
