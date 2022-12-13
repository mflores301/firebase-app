// external imports
import {
  FunctionComponent,
  ReactNode, useReducer
} from "react";

// internal imports
import { INITIAL_STATE } from "../models/state";
import { userReducer } from "../reducers/userReducer";
import { DataContext } from "./DataContext";

interface ComponentProps {
  children: ReactNode;
}

export const DataProvider: FunctionComponent<ComponentProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

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
