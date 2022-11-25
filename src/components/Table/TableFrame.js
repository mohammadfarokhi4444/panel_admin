import {
  Paper,
  Box,
  Table,
  TableContainer,
  CircularProgress,
  Typography,
} from "@mui/material";

const TableFrame = ({ loading, notFoundText, firstItem, children }) => {
  return (
    <TableContainer component={Paper}>
      {loading ? (
        <Box sx={{ m: "20%" }} justifyContent="center" display="flex">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {firstItem ? (
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              {children}
            </Table>
          ) : (
            <Box sx={{ m: "20%" }} justifyContent="center" display="flex">
              <Typography>{notFoundText}</Typography>
            </Box>
          )}
        </>
      )}
    </TableContainer>
  );
};

export default TableFrame;
