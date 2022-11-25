import TableFrameEdit from "../Table/TableFrameEdit";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { signOut, useUserDispatch } from "../../context/UserContext";
import CustomInputOutline from "../Form/CustomInputOutline";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import SubmitButtonFill from "../Form/SubmitButtonFill";
import FetchApi from "../../services/FetchApi";
import _ from "lodash";
import DateLocal from "../Utils/DateLocal";
import SelectWrapper from "../Form/SelectWrapper";
import CustomSnackbar from "../Form/CustomSnackbar";
import CustomInputOutlineDisable from "../Form/CustomInputOutlineDisable";
import BackButtonFill from "../Form/BackButtonFill";

const Edit = () => {
  const navigate = useNavigate();
  const disPatch = useUserDispatch();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackData, setSnackData] = useState();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    status: "",
    email: "",
    position: "",
    createdAt: "",
    lastLoginAt: "",
  });

  const token = localStorage.getItem("token");
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await FetchApi(token, language, "getAdmin", {}, id);
      if (res.success) {
        delete res.dataBody.updatedAt;
        delete res.dataBody.message;
        delete res.dataBody.id;
        res.dataBody.createdAt = DateLocal(res.dataBody.createdAt, language);
        res.dataBody.lastLoginAt = DateLocal(
          res.dataBody.lastLoginAt,
          language
        );

        const merge = _.mergeWith({}, data, res.dataBody, (o, s) =>
          _.isNull(s) ? o : s
        );
        setData(merge);
      } else {
        if (res.status == 401 || res.status == 403) signOut(disPatch, navigate);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const options = [
    { name: "verified" },
    { name: "blocked" },
    { name: "waiting" },
  ];

  const Validation_Schema = Yup.object({
    firstname: Yup.string("").required(t("all.required")),
    lastname: Yup.string().required(t("all.required")),
    username: Yup.string().required(t("all.required")),
    status: Yup.string().required(t("all.required")),
    email: Yup.string().email().required(t("all.required")),
    position: Yup.string().required(t("all.required")),
  });

  const handleSubmit = async (values) => {
    delete values.createdAt;
    delete values.lastLoginAt;
    setIsLoading(true);
    const res = await FetchApi(token, language, "updateAdmin", values, id);
    if (res.success) {
      //
    } else {
      if (res.status == 401 || res.status == 403) signOut(disPatch, navigate);
    }
    setSnackData({
      title: t(`all.${res.success ? "success" : "error"}`),
      type: res.success ? "success" : "error",
      des: res.message,
    });
    setOpenSnackbar(true);
    setIsLoading(false);
  };
  return (
    <>
      <CustomSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        snackData={snackData}
      />
      <Formik
        enableReinitialize
        initialValues={data}
        validationSchema={Validation_Schema}
        onSubmit={handleSubmit}
      >
        <Form>
          <TableFrameEdit
            loading={loading}
            notFoundText={t("all.noData")}
            data={data}
          >
            <Grid className="editFiled" item xs={12} sm={3}>
              {t("admin.firstname")}
            </Grid>
            <Grid className="editFiled" item xs={12} sm={9}>
              <CustomInputOutline name="firstname" />
            </Grid>
            <Grid className="editFiled" item xs={12} sm={3}>
              {t("admin.lastname")}
            </Grid>
            <Grid className="editFiled" item xs={12} sm={9}>
              <CustomInputOutline name="lastname" />
            </Grid>
            <Grid className="editFiled" item xs={12} sm={3}>
              {t("admin.username")}
            </Grid>
            <Grid className="editFiled" item xs={12} sm={9}>
              <CustomInputOutline name="username" />
            </Grid>
            <Grid className="editFiled" item xs={12} sm={3}>
              {t("admin.position")}
            </Grid>
            <Grid className="editFiled" item xs={12} sm={9}>
              <CustomInputOutline name="position" />
            </Grid>
            <Grid className="editFiled" item xs={12} sm={3}>
              {t("admin.email")}
            </Grid>
            <Grid className="editFiled" item xs={12} sm={9}>
              <CustomInputOutline name="email" />
            </Grid>
            <Grid className="editFiled" item xs={12} sm={3}>
              {t("admin.status")}
            </Grid>
            <Grid className="editFiled" item xs={12} sm={9}>
              <SelectWrapper name="status" options={options} />
            </Grid>
            <Grid className="editFiled" item xs={12} sm={3}>
              {t("admin.lastLoginAt")}
            </Grid>
            <Grid className="editFiled" item xs={12} sm={9}>
              <CustomInputOutlineDisable
                name="lastLoginAt"
                defaultValue={data.lastLoginAt}
              />
            </Grid>
            <Grid className="editFiled" item xs={12} sm={3}>
              {t("admin.createdAt")}
            </Grid>
            <Grid className="editFiled" item xs={12} sm={9}>
              <CustomInputOutlineDisable
                name="createdAt"
                defaultValue={data.createdAt}
              />
            </Grid>
            <Box
              width="100%"
              display="flex"
              justifyContent="space-around"
              sx={{
                my: "2%",
              }}
            >
              <Grid className="editFiled" item xs={12} sm={5}>
                <SubmitButtonFill fullWidth={true} disabled={isLoading}>
                  {!isLoading ? (
                    <Typography variant={"body3"}>{t("all.edit")}</Typography>
                  ) : (
                    <CircularProgress size={20} />
                  )}
                </SubmitButtonFill>
              </Grid>
              <Grid className="editFiled" item xs={12} sm={5}>
                <BackButtonFill
                onClick={()=>navigate(-1)}
                  text={t("all.back")}
                />
              </Grid>
            </Box>
          </TableFrameEdit>
        </Form>
      </Formik>
    </>
  );
};

export default Edit;
