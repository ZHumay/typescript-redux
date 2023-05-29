import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersRequest } from "../store/actions/userAction";
import { DataGrid } from "@mui/x-data-grid";
import { fetchUsers } from "../apiService";
import {
  fetchUsersFailure,
  fetchUsersSuccess,
} from "../store/actions/userAction";
import { CircularProgress } from "@mui/material";

function UsersTable() {
  const users = useSelector((state: any) => state.users);
  const loading = useSelector((state: any) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsers = async () => {
      dispatch(fetchUsersRequest());
      try {
        const data = await fetchUsers();
        dispatch(fetchUsersSuccess(data));
      } catch (error: any) {
        dispatch(fetchUsersFailure(error));
      }
    };

    getUsers();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "address.city", headerName: "City", width: 150, renderCell: (params:any) => params.row.address.city },
    { field: "address.street", headerName: "Street", width: 150,renderCell: (params:any) => params.row.address.street },
    { field: "company.name", headerName: "Company Name", width: 150,renderCell:(params:any)=>params.row.company.name },
  ];

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid rows={users} columns={columns} />
        </div>
      )}
    </>
  );
}

export default UsersTable;
