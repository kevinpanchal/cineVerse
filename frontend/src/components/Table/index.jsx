import React from "react";
import { useTable, usePagination } from "react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import styled from "@emotion/styled";

const TableContainerStyled = styled(TableContainer)({
  width: "100%",
});

const TableStyled = styled(Table)({
  width: "100%",
});

const TableHeaderCell = styled(TableCell)({
  padding: "10px",
  borderBottom: "1px solid #ccc",
  textAlign: "left",
  fontWeight: "bold",
});

const TableBodyRow = styled(TableRow)({
  padding: "10px",
  borderBottom: "1px solid #ccc",
  textAlign: "left",
});

const Pagination = styled("div")({
  marginTop: "15px",
  display: "flex",
  justifyContent: "space-between",
});

const ActionButton = styled(Button)({
  marginRight: "5px",
});

const TableComponent = ({ columns, data, handleDelete, handleUpdate, noAction }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  return (
    <div>
      <TableContainerStyled>
        <TableStyled {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, index) => (
              <TableRow
                key={index}
                {...headerGroup.getHeaderGroupProps()}
                className="tableHeaderRow">
                {headerGroup.headers.map((column, i) => (
                  <TableHeaderCell
                    key={i}
                    {...column.getHeaderProps()}
                    className="tableHeaderCell"
                    style={{ letterSpacing: "0px" }}>
                    {column.render("Header")}
                  </TableHeaderCell>
                ))}
                {!noAction && (
                  <TableHeaderCell style={{ letterSpacing: "0px" }}>Action</TableHeaderCell>
                )}
              </TableRow>
            ))}
          </TableHead>
          {page.length > 0 ? (
            <TableBody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <TableBodyRow key={index} {...row.getRowProps()} className="tableBodyRow">
                    {row.cells.map((cell, i) => (
                      <TableCell
                        key={i}
                        {...cell.getCellProps()}
                        className="tableBodyCell"
                        style={{ letterSpacing: "0px" }}>
                        {cell.render("Cell")}
                      </TableCell>
                    ))}
                    {!noAction && (
                      <>
                        <TableCell>
                          <ActionButton
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleUpdate(row.original)}>
                            Update
                          </ActionButton>
                          <ActionButton
                            variant="outlined"
                            color="error"
                            onClick={() => handleDelete(row.original)}>
                            Delete
                          </ActionButton>
                        </TableCell>
                      </>
                    )}
                  </TableBodyRow>
                );
              })}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length + 1}>
                  <Typography variant="body1" align="center">
                    No Data Found
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </TableStyled>
      </TableContainerStyled>
      {data.length > 0 && (
        <Pagination>
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button>
          <Typography variant="body1" component="span">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </Typography>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>
        </Pagination>
      )}
    </div>
  );
};

export default TableComponent;
