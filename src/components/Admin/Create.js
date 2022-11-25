import TableFrameEdit from "../Table/TableFrameEdit";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { signOut, useUserDispatch } from "../../context/UserContext";
import CustomInputOutline from "../Form/CustomInputOutline";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import SubmitButtonFill from "../Form/SubmitButtonFill";
import FetchApi from "../../services/FetchApi";
import _ from "lodash";
import SelectWrapper from "../Form/SelectWrapper";
import CustomSnackbar from "../Form/CustomSnackbar";
import BackButtonFill from "../Form/BackButtonFill";
import CustomInputOutlinePassword from "../Form/CustomInputOutlinePassword";

const Create = () => {
  const navigate = useNavigate();
  const disPatch = useUserDispatch();
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackData, setSnackData] = useState();

  const token = localStorage.getItem("token");

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
    position: Yup.string(),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{5,})/,
        t("all.PasswordUnvalid")
      )
      .required(t("all.required")),
  });
  const initialValuesCreate = {
    firstname: "",
    lastname: "",
    username: "",
    status: "",
    email: "",
    position: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    if(values.position=="")delete values.position
    setIsLoading(true);
    const res = await FetchApi(token, language, "createAdmin", values);
    if (res.success) {
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
    // navigate(-1);
  };
  return (
    <>
      <CustomSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        snackData={snackData}
      />
      <Formik
        initialValues={initialValuesCreate}
        validationSchema={Validation_Schema}
        onSubmit={handleSubmit}
      >
        <Form>
          <TableFrameEdit
            loading={false}
            notFoundText={t("all.noData")}
            data={initialValuesCreate}
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
              {t("admin.password")}
            </Grid>
            <Grid className="editFiled" item xs={12} sm={9}>
              <CustomInputOutlinePassword name="password" />
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
                    <Typography variant={"body3"}>{t("all.create")}</Typography>
                  ) : (
                    <CircularProgress size={20} />
                  )}
                </SubmitButtonFill>
              </Grid>
              <Grid className="editFiled" item xs={12} sm={5}>
                <BackButtonFill
                  onClick={() => navigate(-1)}
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

export default Create;
