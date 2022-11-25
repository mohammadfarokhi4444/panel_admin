import { useEffect, useState } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { signOut, useUserDispatch } from "../../context/UserContext";
import FetchApi from "../../services/FetchApi";
import { useNavigate } from "react-router-dom";
import TableFooterActions from "../Table/TableFooterActions";
import TableFrame from "../Table/TableFrame";
import PageTitle from "../Utils/PageTitle";
import CustomSnackbar from "../Form/CustomSnackbar";
import CustomDialog from "../Form/CustomDialog";

const Resume = () => {
  const navigate = useNavigate();
  const disPatch = useUserDispatch();
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackData, setSnackData] = useState();
  const [deleteItem, setDeleteItem] = useState();
  const [showDialog, setShowDialog] = useState(false);

  const token = localStorage.getItem("token");

  const FetchData = async (newPage = 0, limit = rowsPerPage) => {
    setLoading(true);
    const res = await FetchApi(
      token,
      language,
      "listCV",
      {},
      `?page=${newPage + 1}&limit=${limit}`
    );
    if (res.success) {
      setTotal(res.dataBody.count);
      setRows(res.dataBody.list);
    } else {
      if (res.status == 401 || res.status == 403) signOut(disPatch, navigate);
    }
    setLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      await FetchData();
    }
    fetchData();
  }, []);

  const handleOpenDelete = (item) => {
    setDeleteItem(item);
    setShowDialog(true);
  };
  const handleDelete = async (id) => {
    setShowDialog(false);
    const res = await FetchApi(token, language, "deleteCV", {}, id);
    if (res.success) {
      const lastPage = Math.floor(total / rowsPerPage);
      if (total <= rowsPerPage || page == lastPage) {
        setTotal(total - 1);
        const newRows = rows.filter((el) => el.id !== id);
        setRows(newRows);
      } else {
        await FetchData(page);
      }
    } else {
      if (res.status == 401 || res.status == 403) signOut(disPatch, navigate);
    }
    setSnackData({
      title: t(`all.${res.success ? "success" : "error"}`),
      type: res.success ? "success" : "error",
      des: res.message,
    });
    setOpenSnackbar(true);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;

  return (
    <>
      <CustomSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        snackData={snackData}
      />
      <CustomDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        text={t("all.delete")}
        warningText={t("all.recovery")}
        handleSubmitDialog={() => handleDelete(deleteItem)}
      />
      <PageTitle title={t("resume.title")} />
      <TableFrame
        loading={loading}
        notFoundText={t("resume.notFound")}
        firstItem={!!rows[0]}
      >
        <TableHead>
          <TableRow
            sx={{
              bgcolor: "primary.light",
              borderBottom: "2px solid black",
              "& th": {
                fontSize: "1.2rem",
              },
            }}
          >
            <TableCell align="center">{t("resume.firstname")}</TableCell>
            <TableCell align="center">{t("resume.lastname")}</TableCell>
            <TableCell align="center">{t("resume.mobile")}</TableCell>
            <TableCell align="center">{t("resume.type")}</TableCell>
            <TableCell align="center">{t("resume.actions")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ direction: "rtl" }}>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row" align="center">
                {row.firstname}
              </TableCell>
              <TableCell align="center">{row.lastname}</TableCell>
              <TableCell align="center">{row.mobile}</TableCell>
              <TableCell align="center">{row.type}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => handleOpenDelete(row.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  href={row.File.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DownloadIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooterActions
          total={total}
          rowsPerPage={rowsPerPage}
          page={page}
          setPage={setPage}
          FetchData={FetchData}
          setRowsPerPage={setRowsPerPage}
        />
      </TableFrame>
    </>
  );
};

export default Resume;
