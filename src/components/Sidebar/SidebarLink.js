import {
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";

const SidebarLink = ({
  label,
  link,
  defualtNest,
  icon,
  open,
  myChildren,
  isOpenChild,
  setIsOpenChild,
  nested,
}) => {

  const isActiveItem =
    window.location.pathname === link ||
    window.location.pathname.indexOf(link) !== -1;
    
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link + (defualtNest || ""));
  };

  return (
    <Fragment>
      <List>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              // px: 2.5,
              alignItems:"center"
            }}
            onClick={() => handleClick()}
          >
            <ListItemIcon
              sx={{
                // minWidth: 0,
                // mx: open ? "8px" : "auto",
                justifyContent: "center",
                margin: nested ? "0px 20px" : "0px 8px",
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={label}
              sx={{
                textAlign:"start",
                // display:"flex",
                // justifyContent :"flex-end",
                opacity: open ? 1 : 0,
                color: isActiveItem ? "red" : "common.black",
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      {myChildren && (
        <Collapse
          in={isActiveItem}
          timeout="auto"
          unmountOnExit
          // className={classes.nestedList}
        >
          <List component="div" disablePadding>
            {myChildren.map((child) => (
              <SidebarLink
                key={child.id}
                open={open}
                nested={true}
                isOpenChild={isOpenChild}
                setIsOpenChild={setIsOpenChild}
                {...child}
              />
            ))}
          </List>
        </Collapse>
      )}
    </Fragment>
  );
};

export default SidebarLink;
