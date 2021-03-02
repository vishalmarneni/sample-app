import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { useTable } from 'react-table';

import useUsers from "./useUsers";
import Loader from "../Loader";
import React from 'react';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const UserTable = () => {
  const {
    isLoading,
    usersData,
    columns,
  } = useUsers();

  const classes = useStyles();

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: usersData,
  })
  console.log(rows)
  return isLoading
    ? <Loader />
    : (<TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table" {...getTableProps()}>
        <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
            ))}
          </TableRow>
        ))}
        </TableHead>
        <TableBody>
        {rows.map((row, i) => {
          prepareRow(row)
          console.log(row)
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
        </TableBody>
      </Table>
    </TableContainer>);
};

export default UserTable;
