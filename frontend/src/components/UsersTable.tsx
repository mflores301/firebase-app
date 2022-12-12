// external imports
import { useContext, useState } from "react";
import { Col, Dropdown, Row, Table, Tooltip, User } from "@nextui-org/react";

// internal imports
//icons
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { IconButton } from "./IconButon";
// types/constants
import { IUser } from "../models/user";
import { UserActionTypes } from "../constants/userActionsType";
// context
import { DataContext } from "../context/DataContext";

const UsersTable = () => {
  const { state, dispatch } = useContext(DataContext);
  const [pageSize, setPageSize] = useState<number>(10);

  const viewDetails = (user: IUser) => {
    dispatch({ type: UserActionTypes.SET_SELECTED_USER, payload: user });
    dispatch({ type: UserActionTypes.SET_DETAILS_MODAL, payload: true });
  };

  const viewEdit = (user: IUser) => {
    dispatch({ type: UserActionTypes.SET_SELECTED_USER, payload: user });
    dispatch({ type: UserActionTypes.SET_EDIT_MODAL, payload: true });
  };

  const tableRowRenderer = (user: IUser) => (
    <Table.Row key={user.id}>
      <Table.Cell>
        <User squared src={user.avatar} name={user.username} css={{ p: 0 }}>
          {user.email}
        </User>
      </Table.Cell>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>
        <Row justify="center" align="center">
          <Col css={{ d: "flex" }}>
            <Tooltip content="Details" rounded placement="top">
              <IconButton onClick={() => viewDetails(user)}>
                <EyeIcon size={20} fill="#00e3d7" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip content="Edit user" rounded placement="top">
              <IconButton onClick={() => viewEdit(user)}>
                <EditIcon size={20} fill="#cd0075" />
              </IconButton>
            </Tooltip>
          </Col>
        </Row>
      </Table.Cell>
    </Table.Row>
  );

  return (
    <>
      <Dropdown>
        <Dropdown.Button color="secondary" flat css={{ mb: "$5" }}>
          Display: {pageSize}
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label="Single selection actions"
          color="secondary"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={new Set([String(pageSize)])}
          onSelectionChange={(keys: any) => setPageSize(+keys.currentKey)}
        >
          <Dropdown.Item key="10">10</Dropdown.Item>
          <Dropdown.Item key="25">25</Dropdown.Item>
          <Dropdown.Item key="50">50</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {!!state.users.length && (
        <Table
          bordered
          shadow
          color="secondary"
          aria-label="Example pagination  table"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header>
            {["USER", "NAME", "ACTIONS"].map((column, index) => (
              <Table.Column
                key={index}
                hideHeader={column === "ACTIONS"}
                align={column === "ACTIONS" ? "center" : "start"}
              >
                {column}
              </Table.Column>
            ))}
          </Table.Header>
          <Table.Body items={state.users}>
            {(user) => tableRowRenderer(user)}
          </Table.Body>
          <Table.Pagination
            shadow
            noMargin
            align="center"
            rowsPerPage={pageSize}
            // total={state.users.length}
          />
        </Table>
      )}
    </>
  );
};

export default UsersTable;
