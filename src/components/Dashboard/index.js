import { Grid, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import CardBox from "./CardBox";
import PageTitle from "../Utils/PageTitle";
import { useTranslation } from "react-i18next";
import { signOut, useUserDispatch } from "../../context/UserContext";
import FetchApi from "../../services/FetchApi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const disPatch = useUserDispatch();
  const theme = useTheme();
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const [data, setData] = useState([
    {
      label: t("dashboard.total"),
      total: 0,
      color: theme.palette.primary.main,
    },
    {
      label: t("dashboard.today"),
      total: 0,
      color: theme.palette.secondary.main,
    },
    {
      label: t("dashboard.lastMonth"),
      total: 0,
      color: theme.palette.primary.light,
    },
  ]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function fetchData() {
      const res = await FetchApi(token, language, "dashboard");
      if (res.success) {
        const newData = [...data];
        newData[0].total = res.dataBody.total;
        newData[1].total = res.dataBody.today;
        newData[2].total = res.dataBody.lastMonth;
        setData(newData);
      } else {
        if (res.status == 401 || res.status == 403) signOut(disPatch, navigate);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <PageTitle
        title={t("dashboard.title")}
        fontSize={"h2"}
      />
      <Grid container spacing={4}>
        {data.map((el, index) => (
          <Grid item md={4} sm={12} xs={12} key={index}>
            <CardBox {...el} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Dashboard;
