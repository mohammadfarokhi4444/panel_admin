import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

// logo
import logo from "../../assets/image/logo.svg";

const Logo = () => {
  
  const {t} = useTranslation();
  return (
    <>
      <img src={logo} alt="logo" className="logotypeImage" />
      <Typography
        color="common.white"
        textAlign="center"
        variant="h3"
        component="h2"
      >
        {t("login.companyPanel")}
      </Typography>
    </>
  );
};

export default Logo;
