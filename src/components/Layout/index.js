import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {useLayoutState } from "../../context/LayoutContext";


function Layout() {
const {isSidebarOpened} = useLayoutState()

  const width = isSidebarOpened ? "250px" : "80px"
  return (
    <>
      <Header />
      <Sidebar />
      <Box display="flex">
        <Box
          sx={{
            width: { sm: width, xs: "0px" },
          }}
        ></Box>
        <Box
          sx={{
            p:"2.5%",
            marginTop:"70px",
            width: { sm: `calc(100% - ${width})`, xs: "100%" },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default Layout;
