// external imports
import {
  Avatar,
  Badge,
  Button,
  FormElement,
  Input,
  Loading,
  Modal,
  Text,
} from "@nextui-org/react";
import { ChangeEvent, useContext, useRef, useState } from "react";

// internal imports
// types/constants
import { IUser } from "../models/user";
import { UserActionTypes } from "../constants/userActionsType";
// context
import { DataContext } from "../context/DataContext";
// handlers
import { updateUserHandler } from "../handlers/userRequest";

const UserEdit = () => {
  const { state, dispatch } = useContext(DataContext);
  const [valid, setValid] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<FormElement>({} as FormElement);
  const fileRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  const handleClose = () => dispatch({ type: UserActionTypes.SET_EDIT_MODAL, payload: false });

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleChangeEmail = (event: ChangeEvent<FormElement>) => {
    if (!isValidEmail(event.target.value)) {
      setValid(false);
      return;
    }

    setValid(true);
  };

  const handleUpdate = async () => {
    const updatedUserPayload: IUser = {
      ...(state.selectedUser as IUser),
      email: inputRef.current.value,
    };

    try {
      await updateUserHandler(dispatch, updatedUserPayload, file);
      setFile(null)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      preventClose
      open={state.openEdit}
      onClose={handleClose}
      blur
      css={{ height: "400px" }}
    >
      <Modal.Header>
        <Avatar
          size={"lg"}
          src={state.selectedUser?.avatar}
          bordered
          color="secondary"
          css={{ mr: "$10" }}
        />
        <Text h3>{state.selectedUser?.username}</Text>
      </Modal.Header>
      <Modal.Body>
        <Text b h4>
          Name: <Text>{state.selectedUser?.name}</Text>
        </Text>
        <Input
          rounded
          bordered
          label="Email"
          placeholder="Email"
          color="secondary"
          initialValue={state.selectedUser?.email}
          type="email"
          status={valid ? "success" : "error"}
          helperColor={valid ? "success" : "error"}
          helperText={valid ? "Valid email" : "Enter a valid email"}
          onChange={handleChangeEmail}
          ref={inputRef}
        />
        <Button
          auto
          flat
          color="secondary"
          onClick={() => fileRef.current.click()}
          css={{ mt: '$10' }}
        >
          {file ? file.name : "Change Avatar"}
        </Button>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
      </Modal.Body>
      <Modal.Footer>
        {state.error && (
          <Badge color="error" css={{ mr: "$16" }}>
            Error to Update
          </Badge>
        )}
        <Button
          auto
          flat
          color="error"
          onClick={handleClose}
          css={{ mr: "$7" }}
        >
          Close
        </Button>
        <Button
          auto
          flat
          color="success"
          onClick={handleUpdate}
          disabled={state.loading}
        >
          {state.loading ? (
            <Loading type="points" color="currentColor" size="sm" />
          ) : (
            "Update"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserEdit;
