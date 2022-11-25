import { Button } from "@mui/material";

const BackButtonFill = ({ text, sx, ...otherProps }) => {
  const configButton = {
    ...otherProps,
    variant: "contained",
    fullWidth: true,
  };
  return (
    <Button
      sx={{
        height: "45px",
        borderRaduis: "10px",
        backgroundColor: "info.main",
        color: "common.white",
        "&:hover": {
          bgcolor: "info.main",
        },
        ...sx,
      }}
      {...configButton}
    >
      {text}
    </Button>
  );
};

export default BackButtonFill;
