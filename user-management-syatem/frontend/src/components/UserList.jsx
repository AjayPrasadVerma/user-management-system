import { Link } from "react-router-dom";
import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";

const StyledTable = styled(Table)`
  width: 90%;
  margin: 20px auto 20px auto;
  background: #0000008f;
`;

const THead = styled(TableRow)`
  background: #000000;
  & > th {
    color: #fff;
    font-size: 20px;
  }
`;

const TBody = styled(TableRow)`
  & > td {
    font-size: 20px;
    color: white;
  }
`;

const UserList = ({ userList }) => {
  return (
    <>
      {userList.length !== 0 && (
        <StyledTable>
          <TableHead>
            <THead>
              <TableCell>S No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell></TableCell>
            </THead>
          </TableHead>
          <TableBody>
            {userList.map((user, index) => (
              <TBody key={user._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    component={Link}
                    to={`/users/${user._id}`}
                  >
                    View
                  </Button>
                </TableCell>
              </TBody>
            ))}
          </TableBody>
        </StyledTable>
      )}
    </>
  );
};

export default UserList;
