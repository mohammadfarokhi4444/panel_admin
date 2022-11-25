import { Alert, AlertTitle, Snackbar } from "@mui/material";

const CustomSnackbar = ({openSnackbar,setOpenSnackbar,snackData}) => {
    const closeAlert = (event, reason) => {
      if (reason == "clickaway") return;
      setOpenSnackbar(false);
    };
  return (
    <Snackbar
      // className={snackData.type == "error" ? style.snackError : style.snackOk}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={closeAlert}
    >
      <Alert severity={snackData?.type || "error"} onClose={closeAlert} variant="filled">
        <AlertTitle>{snackData?.title}</AlertTitle>
        {snackData?.des}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
