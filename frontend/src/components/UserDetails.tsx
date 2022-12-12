// external imports
import { useContext } from "react";
import { Avatar, Button, Modal, Text } from "@nextui-org/react";

// internal imports
import { DataContext } from "../context/DataContext";
import { UserActionTypes } from "../constants/userActionsType";

const UserDetails = () => {
  const { state, dispatch } = useContext(DataContext);

  const handleClose = () => {
    dispatch({ type: UserActionTypes.SET_DETAILS_MODAL, payload: false });
  };

  return (
    <Modal preventClose open={state.openDetails} onClose={handleClose} blur>
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
        <Text b h4>
          Email: <Text color="secondary">{state.selectedUser?.email}</Text>
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetails;
