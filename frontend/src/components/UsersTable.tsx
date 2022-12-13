// external imports
import { useContext, useEffect } from "react";
import { Col, Dropdown, Pagination, Row, Table, Tooltip, User } from "@nextui-org/react";

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
import { getUsersHandler } from "../handlers/userRequest";

const UsersTable = () => {
  const { state, dispatch } = useContext(DataContext);

  const viewDetails = (user: IUser) => {
    dispatch({ type: UserActionTypes.SET_SELECTED_USER, payload: user });
    dispatch({ type: UserActionTypes.SET_DETAILS_MODAL, payload: true });
  };

  const viewEdit = (user: IUser) => {
    dispatch({ type: UserActionTypes.SET_SELECTED_USER, payload: user });
    dispatch({ type: UserActionTypes.SET_EDIT_MODAL, payload: true });
  };

  const handleChangePageSize = (pageSize: number) => {
    dispatch({
      type: UserActionTypes.SET_PAGE_SIZE,
      payload: pageSize,
    });
  };

  const handleChangePagination =  (page:number) =>{ 
    dispatch({
      type: UserActionTypes.SET_PAGE,
      payload: page
    })
  }

  useEffect(()=>{
    getUsersHandler(dispatch,state.pagination)
  },[state.pagination.pageSize, state.pagination.page])

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
          Display: {state.pagination.pageSize}
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label="Single selection actions"
          color="secondary"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={new Set([String(state.pagination.pageSize)])}
          onSelectionChange={(keys: any) =>
            handleChangePageSize(+keys.currentKey)
          }
        >
          <Dropdown.Item key="10">10</Dropdown.Item>
          <Dropdown.Item key="25">25</Dropdown.Item>
          <Dropdown.Item key="50">50</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Pagination color="secondary" total={state.pagination.size} css={{ mb: "$5" }} onChange={handleChangePagination} />
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
        </Table>
      )}
    </>
  );
};

export default UsersTable;
