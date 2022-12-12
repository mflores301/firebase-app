import axios from "axios";
import { Dispatch } from "react";
import { UserActions } from "../actions/userActions";
import { UserActionTypes } from "../constants/userActionsType";
import { IUser } from "../models/user";
import { uploadImage } from "./fileUpload";

export const getUsersHandler = async (dispatch: Dispatch<UserActions>) => {
  try {
    dispatch({ type: UserActionTypes.API_CALL_INIT });
    dispatch({ type: UserActionTypes.API_SET_ERROR, payload: false });
    const response = await axios.get(
      "http://127.0.0.1:5001/demo-lavamap/us-central1/api/user"
    );
    dispatch({
      type: UserActionTypes.SET_USERS_DATA,
      payload: response.data.data.users,
    });
    dispatch({ type: UserActionTypes.API_SET_ERROR, payload: false });
    dispatch({ type: UserActionTypes.API_CALL_END });
  } catch (error) {
    dispatch({ type: UserActionTypes.API_SET_ERROR, payload: true });
    dispatch({ type: UserActionTypes.API_CALL_END });
  }
};

export const updateUserHandler = async (
  dispatch: Dispatch<UserActions>,
  user: IUser,
  file: File | null
) => {
  try {
    let imageUrl: string | undefined;
    if (file) imageUrl = await uploadImage(file);
    const { id, ...restPayload } = user;
    const updatePayload: Omit<IUser, "id"> = imageUrl
      ? {
          ...restPayload,
          avatar: imageUrl,
        }
      : restPayload;
    dispatch({ type: UserActionTypes.API_CALL_INIT });
    dispatch({ type: UserActionTypes.API_SET_ERROR, payload: false });
    await axios.put(
      `http://127.0.0.1:5001/demo-lavamap/us-central1/api/user/${id}`,
      updatePayload
    );
    dispatch({
      type: UserActionTypes.UPDATE_USER,
      payload: { id, data: updatePayload },
    });
    dispatch({
      type: UserActionTypes.SET_SELECTED_USER,
      payload: {id,...updatePayload},
    });
    dispatch({ type: UserActionTypes.API_SET_ERROR, payload: false });
    dispatch({ type: UserActionTypes.API_CALL_END });
  } catch (error) {
    dispatch({ type: UserActionTypes.API_SET_ERROR, payload: true });
    dispatch({ type: UserActionTypes.API_CALL_END });
  }
};
