import { Drawer } from "@mui/material";

export default function MiniDrawer({ open, setOpen, anchor, children }) {
  return (
    <Drawer
      variant={"temporary"}
      anchor={anchor}
      open={!!open}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      onClose={() => setOpen(false)}
      sx={{
        direction: anchor == "right" ? "rtl" : "ltr",
        // display: { xs: "block" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
      }}
    >
      {children}
    </Drawer>
  );
}
