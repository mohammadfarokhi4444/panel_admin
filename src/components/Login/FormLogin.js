import { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Box,
  Fade,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInputBase from "../Form/CustomInputBase";
import { useTranslation } from "react-i18next";
import {useNavigate} from "react-router-dom"

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import SubmitButtonFill from "../Form/SubmitButtonFill";
import SwitchLanguage from "../Utils/SwitchLanguage";
import CustomInputBasePassword from "../Form/CustomInputBasePassword";

const FormLogin = (props) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate()
  // global
  const userDispatch = useUserDispatch();

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const Validation_Schema = Yup.object({
    username: Yup.string("").required(t("login.required")),
    password: Yup.string().required(t("login.required")),
  });

  const Initial_Values = {
    username: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    await loginUser(
      i18n.language,
      userDispatch,
      values.username,
      values.password,
      navigate,
      setIsLoading,
      setError
    );
  };
  return (
    <>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <SwitchLanguage />
      </Box>
      <Box sx={{ textAlign: "center", marginTop: "20%" }}>
        <Typography variant="h3">{t("login.title")}</Typography>
      </Box>

      <Box sx={{ textAlign: "center", marginTop: "7%" }}>
        <Typography variant="h3">{t("login.greeting")}</Typography>
        <Fade in={!!error}>
          <Typography color="secondary" sx={{ textAlign: "center", marginTop:"3%" }}>
            {error}
          </Typography>
        </Fade>
        <Formik
          initialValues={Initial_Values}
          validationSchema={Validation_Schema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Grid container>
              <Grid item xs={12}>
                <CustomInputBase
                  name="username"
                  placeholder={t("login.username")}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomInputBasePassword
                  name="password"
                  placeholder={t("login.password")}
                />
              </Grid>

              <Grid item xs={12}>
                <SubmitButtonFill
                  disabled={isLoading}
                  sx={{
                    width: "40%",
                    mt: "7%",
                  }}
                >
                  {!isLoading ? (
                    <Typography variant={"body3"}>
                      {t("login.title")}
                    </Typography>
                  ) : (
                    <CircularProgress size={20} />
                  )}
                </SubmitButtonFill>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Box>
    </>
  );
};

export default FormLogin;
