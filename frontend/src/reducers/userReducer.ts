// actions
import { UserActions } from "../actions/userActions";
// models
import { MainState } from "../models/state";
// types
import { UserActionTypes } from "../constants/userActionsType";

export const userReducer = (
  state: MainState,
  action: UserActions
): MainState => {
  switch (action.type) {
    case UserActionTypes.API_CALL_INIT:
      return { ...state, loading: true };
    case UserActionTypes.API_CALL_END:
      return {
        ...state,
        loading: false,
      };
    case UserActionTypes.SET_USERS_DATA:
      return {
        ...state,
        users: action.payload,
      };
    case UserActionTypes.SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    case UserActionTypes.API_SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case UserActionTypes.SET_DETAILS_MODAL:
      return {
        ...state,
        openDetails: action.payload,
      };
    case UserActionTypes.SET_EDIT_MODAL:
      return {
        ...state,
        openEdit: action.payload,
      };
    case UserActionTypes.SET_PAGE_SIZE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          pageSize: action.payload,
          page: 1
        },
      };
    case UserActionTypes.SET_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload,
        },
      };
    case UserActionTypes.SET_PAGINATION_SIZE:
        return {
          ...state,
          pagination: {
            ...state.pagination,
            size: action.payload,
          }
        }
    case UserActionTypes.UPDATE_USER:
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      state.users[index] = { id: action.payload.id, ...action.payload.data };
      return state;
    default:
      return state;
  }
};
