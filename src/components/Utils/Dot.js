import { Box } from "@mui/material";
import React from "react";

const DOT = ({ size = 8, color }) => {
  return (
    <Box
      sx={{
        width: size + "px",
        height: size + "px",
        borderRadius: size + "px",
        backgroundColor: color || "primary.light",
      }}
    />
  );
};

export default DOT;
