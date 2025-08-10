import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
function ShowUsers() {
  interface User {
    username: string,
    email: string,
    password: string
  }
  let [data, setData] = useState<User[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/register").then((res) => res.json()).then((data) => setData(data));
  }
    , []);
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((element) => (
            <TableRow>
              <TableCell>{element.username}</TableCell>
              <TableCell>{element.email}</TableCell>
              <TableCell>{element.password}</TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

}

export default ShowUsers;