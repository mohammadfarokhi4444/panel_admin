import {
  Paper,
  Box,
  Table,
  TableContainer,
  CircularProgress,
  Typography,
  Grid,
} from "@mui/material";

const TableFrameEdit = ({ loading, notFoundText, data, children }) => {
  return (
    <TableContainer component={Paper}>
      {loading ? (
        <Box sx={{ m: "20%" }} justifyContent="center" display="flex">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {data ? (
            <Grid container display="flex" alignItems="center">{children}</Grid>
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

export default TableFrameEdit;
