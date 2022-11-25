import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { ArrowForward, Menu, Person } from "@mui/icons-material";
import { useLayoutState } from "../../context/LayoutContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import MenuProfile from "./MenuProfile";
import "../../assets/style/header.css";

const Header = () => {
  const { t } = useTranslation();
  const { isSidebarOpened, setIsSidebarOpened } = useLayoutState();
  const [profileMenu, setProfileMenu] = useState(false);
  return (
    <AppBar position="fixed" className="appBar">
      <Toolbar className="toolbar">
        <Box
          display="flex"
          sx={{ width: "100%", justifyContent: "space-between" }}
        >
          <Box display="flex" sx={{ alignItems: "center" }}>
            <IconButton
              color="inherit"
              onClick={() => setIsSidebarOpened(!isSidebarOpened)}
              className="headerMenuButtonSandwich"
            >
              {isSidebarOpened ? <ArrowForward /> : <Menu />}
            </IconButton>
            <Typography
              color="common.whit"
              component="h6"
              variant="h6"
              className="logotype"
            >
              {t("header.companyPanel")}
            </Typography>
          </Box>
          <IconButton
            aria-haspopup="true"
            color="inherit"
            aria-controls="profile-menu"
            onClick={(e) => setProfileMenu(e.currentTarget)}
          >
            <Person color="common.white" fontSize="20px" />
          </IconButton>
        </Box>
        <MenuProfile
          profileMenu={profileMenu}
          setProfileMenu={setProfileMenu}
          t={t}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
