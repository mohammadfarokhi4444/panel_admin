import { Menu, Box, Typography, Button } from "@mui/material";
import {
  useUserState,
  signOut,
  useUserDispatch,
} from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import SwitchLanguage from "../Utils/SwitchLanguage";

const MenuProfile = ({ profileMenu, setProfileMenu, t }) => {
  const { fullname } = useUserState();
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();
  return (
    <Menu
      id="profile-menu"
      open={!!profileMenu}
      anchorEl={profileMenu}
      onClose={() => setProfileMenu(false)}
      className="headerMenu"
      disableAutoFocusItem
    >
      <Box sx={{ minWidth: "200px", p: "20px", textAlign: "center" }}>
        <Typography sx={{ pb: "20px" }} component="h4" variant="h6">
          {fullname}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography
            component="h6"
            variant="h6"
            className="profileMenuLink"
            color="primary.main"
            onClick={() => signOut(userDispatch, navigate)}
          >
            {t("header.logout")}
          </Typography>
          <SwitchLanguage setProfileMenu={setProfileMenu} />
        </Box>
      </Box>
    </Menu>
  );
};

export default MenuProfile;
