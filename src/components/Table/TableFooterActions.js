import {
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";
import TablePaginationActions from "../Table/TablePaginationActions";

const TableFooterActions = ({
  total,
  rowsPerPage,
  page,
  setPage,
  FetchData,
  setRowsPerPage,
}) => {
  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    await FetchData(newPage);
  };

  const handleChangeRowsPerPage = async (event) => {
    const limit = parseInt(event.target.value, 10);
    setRowsPerPage(limit);
    setPage(0);
    await FetchData(0, limit);
  };
  return (
    <TableFooter sx={{ direction: "ltr" }}>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          // colSpan={colSpan}
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  );
};

export default TableFooterActions;
